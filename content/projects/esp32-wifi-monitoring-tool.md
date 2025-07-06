---
title: 'ESP32 WiFi Monitoring Toolkit'
description: "An ESP32 Based Tool for Monitoring WiFi Networks"
headline: 'An ESP32 Based Tool for Monitoring WiFi Networks'
excerpt: "A powerful DIY toolkit using the ESP32 for scanning, monitoring, and analyzing WiFi networks, all from a tiny board."
date: '2024-09-21T14:21:15'
dateUpdated: ''
author: 'Angel Capra'
authorUrl: 'https://github.com/4ngel2769'
tags: ['ESP32', 'WiFi', 'Monitoring', 'Toolkit']
socialImage:
    src: '/default.jpg'
    mime: 'webp'
    alt: 'ESP32 WiFi Monitoring Toolkit'
    width: 1200
    height: 630
---

The ESP32 is a powerhouse in a tiny package, WiFi, Bluetooth, and loads of GPIOs. I decided to turn that power into a portable WiFi monitoring toolkit.

This post walks through what it is, what it can do, and why it exists.

## Table of Contents

- [Why I Built This](#why-i-built-this)
- [What It Does](#what-it-does)
- [Hardware Overview](#hardware-overview)
- [Software Features](#software-features)
- [Usage & Output](#usage--output)
- [Limitations](#limitations)
- [What's Next](#whats-next)

## Why I Built This

I wanted a simple, portable tool for monitoring WiFi environments ' scanning nearby networks, capturing packets, and logging basic metadata. Most tools require bulky hardware or are tied to a laptop. I wanted something self-contained that could fit in your pocket.

## What It Does

This toolkit can:

- Scan nearby 2.4GHz WiFi networks (SSID, RSSI, MAC, channel)
- Detect hidden SSIDs
- Log beacon frame metadata
- Monitor packets in promiscuous mode (lightweight sniffing)
- Display results on an OLED screen
- Optionally output logs via serial
- Run from battery power

## Hardware Overview

The core components:

- **ESP32 (WROOM or WROVER)** ' the brain.
- **0.96" 128x64 OLED (I²C)** ' for displaying SSIDs and stats.
- **Push Buttons** ' for mode switching and UI navigation.
- **Optional: LiPo battery + charger circuit** for portability.

A compact enclosure 3D printed using my Elegoo Neptune 4 Pro ties it all together.

## Software Features

The firmware was written in Arduino (ESP-IDF backend), structured for modularity.

Key features:

- **Active & Passive Scanning**
- **Beacon Frame Parsing**
- **MAC Vendor Lookup** (optional via hash mapping)
- **Button Menu Navigation**
- **Display Modes:** SSID List, Channel Heatmap, Signal Strength Graph

Here's a peek at the main scanning logic:

```cpp
WiFi.mode(WIFI_MODE_NULL);
esp_wifi_set_promiscuous(true);
esp_wifi_set_promiscuous_rx_cb(&snifferCallback);
````

## Usage & Output

Once powered up, the toolkit boots into a live scanning mode. You'll see a scrolling list of detected access points, each showing:

* SSID (or `<hidden>`)
* Signal strength (dBm)
* MAC address
* Channel

You can press a button to cycle between views or pause/resume scanning.

Data can also be sent over serial (useful for logging).

## Limitations

* 2.4GHz only (no 5GHz support on most ESP32 chips)
* Not a full packet sniffer, more like metadata analysis
* OLED is small, best for compact data
* Promiscuous mode support can vary across firmware versions

## What's Next

Planned upgrades:

* Web-based dashboard via ESP32 AP
* Packet injection support
* Touch interface on TFT screens
* Better power management for field use

This is just the beginning. The ESP32 has more potential than most people realize. If you're into wireless monitoring, pentesting, or just love DIY tools, this project is for you.

---

> #### 🔧 [See the source code on GitHub](https:\/\/github.com/4ngel2769)
> #### 📸 Demo pictures and schematics files will be added soon!
---