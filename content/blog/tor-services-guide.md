---
title: "Setting Up a Tor Hidden Service: Complete Guide to .onion Sites"
description: "A comprehensive guide to setting up and securing Tor hidden services on Debian-based systems. Learn how to create .onion sites, secure your service, and maintain anonymity."
date: "2025-09-27"
author: "Angel Capra"
tags: ["tor", "anonymity", "privacy", "hidden services", "onion", "security", "networking"]
socialImage:
  src: "https://i.imgur.com/hLzqWjX.jpeg"
  alt: "Tor Network Security and Privacy Concept"
---

# Setting Up a Tor Website (Hidden Service)

This guide walks you through setting up a **Tor hidden service** on Debian-based systems. Whether you're running Parrot Security OS, Ubuntu, or plain Debian, this will get you up and running.

## Chapter 1: Installing Tor

First things first - get Tor installed on your system:

```bash
sudo apt update
sudo apt install tor
```

Check if it's running:

```bash
sudo systemctl status tor
```

Not running? Start it:

```bash
sudo systemctl start tor
```

## Chapter 2: Basic Hidden Service Configuration

Time to configure your hidden service. We'll assume you have something running locally on port 5000.

Open the Tor configuration file:

```bash
sudo nano /etc/tor/torrc
```

Add these lines at the bottom:

```ini
HiddenServiceDir /var/lib/tor/hidden_service/
HiddenServicePort 80 127.0.0.1:5000
```

What this does:
- `HiddenServiceDir` - where Tor stores your service's keys and address
- `HiddenServicePort` - forwards .onion traffic on port 80 to your local service on port 5000

Save and exit (`Ctrl+X`, `Y`, `Enter`).

Restart Tor:

```bash
sudo systemctl restart tor
```

## Chapter 3: Getting Your .onion Address

Tor generates your unique .onion address automatically. Find it:

```bash
sudo cat /var/lib/tor/hidden_service/hostname
```

You'll see something like:

```
abc123def456.onion
```

That's your site's Tor address.

## Chapter 4: Security Setup (Don't Skip This)

Here's where most tutorials fail you. Hidden services aren't just "set and forget."

### Protecting Your Keys

Your `/var/lib/tor/hidden_service/` directory contains files that ARE your hidden service identity. If someone gets these files, they own your .onion address.

Set proper permissions:

```bash
sudo chmod 700 /var/lib/tor/hidden_service/
sudo chown debian-tor:debian-tor /var/lib/tor/hidden_service/
```

### Your Local Service is Now Public

That service running on `127.0.0.1:5000`? It's now accessible to anyone on Tor. Make sure:

- Authentication is enabled if you need it
- Debug modes are disabled
- No sensitive data is exposed in error messages
- You're running the latest version

### Know the Risks

Running a hidden service means:
- Your server can still be fingerprinted through traffic analysis
- Law enforcement monitors Tor actively
- Attackers probe .onion sites constantly
- One misconfiguration can expose your real IP

Don't log user activity unnecessarily. Consider running your service in a container or separate VM.

## Chapter 5: Backup Your Service (Critical)

Lose your service directory = lose your .onion address forever. No recovery possible.

Create a backup:

```bash
sudo cp -r /var/lib/tor/hidden_service/ ~/hidden_service_backup/
sudo chmod 600 ~/hidden_service_backup/*
```

Store this backup somewhere secure and encrypted. Not on cloud storage. Not on the same server.

To restore a backup:

```bash
sudo systemctl stop tor
sudo rm -rf /var/lib/tor/hidden_service/
sudo cp -r ~/hidden_service_backup/ /var/lib/tor/hidden_service/
sudo chown -R debian-tor:debian-tor /var/lib/tor/hidden_service/
sudo chmod 700 /var/lib/tor/hidden_service/
sudo systemctl start tor
```

## Chapter 6: Testing Your Setup

Make sure your local service responds:

```bash
curl http://127.0.0.1:5000
```

If that works, test the .onion address:

1. Download Tor Browser from torproject.org
2. Open Tor Browser
3. Navigate to your .onion address: `http://abc123def456.onion`

You should see your site.

## Chapter 7: Advanced Configuration

### Multiple Hidden Services

Want to run multiple services? Add more blocks to your `torrc`:

```ini
# Service 1
HiddenServiceDir /var/lib/tor/hidden_service_1/
HiddenServicePort 80 127.0.0.1:5000

# Service 2  
HiddenServiceDir /var/lib/tor/hidden_service_2/
HiddenServicePort 80 127.0.0.1:6000
```

Each gets its own .onion address.

### Port Mapping Options

You're not limited to port 80:

```ini
# Map .onion port 8080 to local port 3000
HiddenServicePort 8080 127.0.0.1:3000

# Multiple ports for one service
HiddenServicePort 80 127.0.0.1:5000
HiddenServicePort 443 127.0.0.1:5443
```

### SSL/HTTPS Considerations

Most .onion sites use HTTP, not HTTPS. Why? Tor already encrypts everything. Adding SSL:

- Doesn't improve security
- Can create fingerprinting opportunities  
- Adds complexity

If you really want HTTPS, you'll need a self-signed certificate since Let's Encrypt doesn't work with .onion domains.

## Chapter 8: Troubleshooting

### Tor Won't Start

Check the logs:

```bash
journalctl -u tor -f
```

Common issues:
- Typos in `torrc`
- Permission problems with service directories
- Local service not running

### Can't Access .onion Site

1. Verify your local service is running: `curl http://127.0.0.1:5000`
2. Check Tor status: `sudo systemctl status tor`  
3. Look for errors in logs: `journalctl -u tor`
4. Verify .onion address: `sudo cat /var/lib/tor/hidden_service/hostname`

### Permission Errors

Check directory ownership:

```bash
ls -la /var/lib/tor/
```

Should show `debian-tor` as owner. If not:

```bash
sudo chown -R debian-tor:debian-tor /var/lib/tor/hidden_service/
```

## Wrap-up

You now have a working Tor hidden service. Quick checklist:

✓ Tor installed and running  
✓ Hidden service configured  
✓ Proper file permissions set  
✓ Service backed up securely  
✓ Local service secured  
✓ .onion address tested  

Remember: running a hidden service has legal and security implications. Stay informed about best practices and keep everything updated.

The Tor network provides anonymity, not invincibility. Plan accordingly.
