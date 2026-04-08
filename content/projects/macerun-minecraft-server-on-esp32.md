---
title: 'Macerun - Building a Minecraft Server on an ESP32 Microcontroller'
description: "A deep dive into writing a bare-metal Minecraft 1.16.5 server in C for the ESP32-S3. Learn how to handle custom procedural generation, raw TCP sockets, and extreme memory constraints."
headline: 'Macerun: Running Minecraft 1.16.5 on an ESP32'
excerpt: "Running a Java-based game server usually takes gigabytes of RAM. What if it took just a few megabytes? Learn how I built a bare-metal Minecraft server in raw C using FreeRTOS, lwIP, and custom procedural generation."
date: '2026-04-08T15:10:03'
author: 'angeldev0'
authorUrl: 'https://github.com/4ngel2769'
tags: ['Minecraft', 'ESP32', 'C', 'Embedded', 'FreeRTOS', 'Networking']
socialImage:
    src: 'https://i.imgur.com/l5k0cU7.png'
    mime: 'png'
    alt: 'Macerun Minecraft server running on ESP32-S3'
    width: 1200
    height: 630
---

Running a Minecraft server on a beefy PC with upward of 16GB of RAM isn't super difficult these days. But as an embedded developer, I wanted to ask a different question: what is the absolute minimum hardware required to host a functional Minecraft server?

Inspired by projects like PortalRunner's *bareiron*, I decided to build **Macerun**. It's a bare-metal Minecraft 1.16.5 (Java edition) server written completely in C for the ESP32-S3 microcontroller. There's no Java runtime, no Linux kernel, and no standard server wrappers. 

## Visual Showcase

Here is a look at the tiny ESP32-S3 running the entire server, plugged into my PC with just a single USB-C cable:

![ESP32-S3 Board connected via a single USB-C cable](/images/macerun-hardware.jpg)

And here is what it looks like in-game!

![Gameplay screenshot of Macerun](https://ipp.angellabs.xyz/s/macerun-gameplay-1)

### Video Demonstration

Check out this short video showing a player joining, breaking blocks, and using the chat directly through the microcontroller:

<video controls width="100%">
  <source src="https://i.imgur.com/nC9TFg4.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## The Challenge: Speaking Minecraft in C

The ESP32-S3 `esp32s3n16r8` has 16MB of Flash and 8MB of octal PSRAM. To make a Minecraft server fit, I had to throw out conventional file systems and memory models. 

The architecture is built completely from scratch:
1. **Raw Sockets:** Using lwIP TCP sockets running on FreeRTOS tasks to juggle connections.
2. **Protocol 754:** Manually crafting the byte structures to speak Minecraft 1.16.5 protocol using community docs like `wiki.vg` and `PrismarineJS`.
3. **No Anvil Files:** Chunks are procedurally generated on the fly. 

To communicate with the Java client, I had to build a custom packet reader/writer that handles Minecraft's specific data types, like `VarInt`s.

```c [proto_framing.c]
bool proto_write_varint(proto_writer_t *writer, int32_t value)
{
    uint32_t encoded = (uint32_t)value;

    while (true)
    {
        uint8_t byte = encoded & 0x7F;
        encoded >>= 7;
        if (encoded != 0)
        {
            byte |= 0x80;
        }
        if (!proto_write_u8(writer, byte))
        {
            return false;
        }
        if (encoded == 0)
        {
            break;
        }
    }
    return true;
}
```

## Procedural World Generation

You can't load massive world files into 8MB of RAM. Instead, the world is generated procedurally right before it's sent over the network to the player. 

The engine uses 2D biome generation combined with bilinear interpolated heightmaps. By using FNV-1a hashing, I can ensuring the terrain is deterministic without storing it all in memory.

::alert{type="tip"}
**Memory Optimization:** By generating chunks on the fly into a shared transmission buffer, we prevent the heap fragmentation that usually plagues embedded web servers.
::

## State Persistence: Where Do Blocks Go?

If we don't store the world in memory, what happens when a player places a dirt block? 

Instead of saving whole chunks, Macerun only saves **Block Deltas** (the specific coordinates and block IDs of changes). These are kept in a tiny memory footprint and written directly to the ESP32's Non-Volatile Storage (NVS) flash partition.

```c [block_deltas.h]
typedef struct __attribute__((packed))
{
    int16_t x;
    uint8_t y;
    int16_t z;
    uint8_t block_id;
} world_block_delta_t;

typedef struct
{
    world_block_delta_t entries[WORLD_MAX_BLOCK_DELTAS];
    size_t count;
} world_deltas_t;
```

When a chunk generator runs, it overlays these `world_deltas_t` entries on top of the procedural terrain before sending it to the client.

## What Works (And What Doesn't)

Surprisingly, the server is highly playable! Up to 4 players can join concurrently. 

**Currently Working:**
- Terrain generation and chunk sending.
- Block breaking and placing.
- Basic physics, health, and hunger loops.
- 2x2 inventory crafting.
- Multiplayer entity tracking and chat.

**Not Implemented Yet:**
- Mob spawning and AI.
- 3x3 crafting benches, furnaces, and tile entities (chests).
- Persisting player inventory and location upon disconnect.

::alert{type="caution"}
**Disclaimer:** Please do not try to port your 100-player survival SMP to this code! It is strictly a proof-of-concept prototype.
::

## Conclusion

Building Macerun proved that with extreme optimization and a little bit of networking magic, even a complex game protocol like Minecraft can run on a $5 microcontroller. It's an incredible exercise in memory management and C programming. 

The project is entirely open source. If you enjoy C programming, low-level networking, or constrained hardware, I would be happy to get some feedback or pull requests!

---

**Want to check out the code?** Head over to the [Macerun GitHub repository](https://github.com/4ngel2769/macerun) and take a look around! Let me know what you think.
