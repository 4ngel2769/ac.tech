---
title: 'Pwnagotchi Generator - Synthetic Fleet Testing for opwngrid'
description: "A comprehensive testing framework for simulating multiple Pwnagotchi instances with authentic cryptographic identities, multi-threaded performance, and full fleet management capabilities."
headline: 'Pwnagotchi Generator: Production-Grade Testing for opwngrid Infrastructure'
excerpt: "Discover how to test and stress-test opwngrid deployments with synthetic Pwnagotchi units that behave like the real thing. Features multi-threaded AP reporting, Tor anonymity, and a complete fleet management system."
date: '2025-10-21T12:00:00'
author: 'angeldev0'
authorUrl: ''
tags: ['Pwnagotchi', 'Testing Tools', 'Python', 'CLI Tool', 'Fleet Management', 'Cryptography']
socialImage:
    src: 'https://i.imgur.com/Q3hgcV8.png'
    mime: 'png'
    alt: 'Pwnagotchi Generator fleet management dashboard'
    width: 1200
    height: 630
---

Testing distributed systems is hard. Testing a grid of autonomous WiFi-hacking devices is even harder. That's why I built the **Pwnagotchi Generator**: a comprehensive framework for creating synthetic Pwnagotchi instances that can stress-test opwngrid deployments without needing physical hardware.

## The Problem

If you're running your own opwngrid instance or developing features for the Pwnagotchi ecosystem, you need a way to test at scale. But spinning up dozens or hundreds of real Pwnagotchi devices isn't practical. You need synthetic units that:

- Generate authentic RSA keypairs and signatures
- Properly enroll with opwngrid infrastructure
- Report access points like real devices
- Support Tor for anonymity testing
- Can simulate high-volume scenarios (millions of pwned networks)
- Are manageable through a unified interface

Existing solutions either didn't exist or couldn't handle the scale and authenticity required for production testing.

## What is Pwnagotchi Generator?

Pwnagotchi Generator is a three-component testing framework that creates and manages synthetic Pwnagotchi instances:

**Generator Script** (`pwnagotchi-gen.py`)
- Creates units with real RSA-2048 keypairs
- Implements proper PKCS1-PSS cryptographic signing
- Enrolls with opwngrid using authentic authentication flow
- Reports access points with configurable pwned counts
- Supports 1-50 parallel reporting threads for performance
- Routes each unit through its own Tor circuit

**Fleet Manager CLI** (`pwnie-manager.py`)
- Interactive terminal interface for managing units
- Start, stop, restart individual or bulk units
- Real-time monitoring and statistics
- Tor exit node information
- Persistent state management

**Web Dashboard** (`pwnie_webui.py`)
- Real-time WebSocket-based interface
- Visual status indicators for each unit
- Fleet-wide statistics and metrics
- One-click controls for unit lifecycle

## Why I Built This

I needed to test my own opwngrid deployment under realistic load conditions. I wanted to verify:

- Authentication and enrollment flows at scale
- AP reporting performance with high volumes
- Database behavior under concurrent connections
- API rate limiting and error handling
- How the system handles units with millions of pwned networks

Manual testing with a few units wasn't sufficient. I needed hundreds of units reporting thousands of APs. So I built a system that could simulate this realistically while still being easy to control.

## Key Features

### Authentic Simulation
Every synthetic unit generates real RSA keypairs, computes proper fingerprints, and signs enrollment requests exactly like real Pwnagotchi devices. The opwngrid server can't tell the difference.

### Multi-Threaded Performance
When testing units with millions of pwned networks, single-threaded AP reporting takes hours. With the `--threads` flag, you can use 1-50 parallel threads:

```bash
# 1M pwned networks: 8 minutes → 30 seconds
python3 pwnagotchi-gen.py --count 1 --name mega --pwned 1000000 --threads 20 --yes
```

| Pwned Count | Threads | Time     |
|-------------|---------|----------|
| 1,000,000   | 1       | ~8 min   |
| 1,000,000   | 20      | ~30 sec  |
| 1,000,000   | 50      | ~12 sec  |

### Tor Anonymity
Each unit can route through its own Tor circuit, simulating distributed deployments:

```bash
# 25 units, each with their own Tor circuit
python3 pwnagotchi-gen.py --count 25 --tor --pwned random
```

### Persistent State
Units save complete state to disk (keys, tokens, statistics, APs) and can be resumed later through the fleet manager.

## How to Use

### Installation

```bash
git clone https://github.com/4ngel2769/pwnagotchi-generator.git
cd pwnagotchi-generator
pip3 install -r requirements.txt
```

### Quick Start: Generate Units

```bash
# Create single unit with 100K pwned networks
python3 pwnagotchi-gen.py --count 1 --name test --pwned 100000 --yes

# Create 10 units through Tor with random stats
python3 pwnagotchi-gen.py --count 10 --tor --pwned random

# High-performance: 1M pwned, 20 threads
python3 pwnagotchi-gen.py --count 1 --name mega --pwned 1000000 --threads 20 --yes
```

### Fleet Management

```bash
# CLI interface
python3 pwnie-manager.py

# In the CLI:
list              # Show all units
boot all          # Start all units
monitor           # Real-time monitoring
stats             # Fleet statistics

# Web interface
python3 pwnie-manager.py --webui
# Then browse to http://localhost:5000
```

## How It Works (Technical Deep Dive)

### Authentication Flow

1. **Keypair Generation**: Each unit generates an RSA-2048 keypair
2. **Identity Creation**: Computes SHA-256 fingerprint from public key
3. **Signature**: Signs `name@fingerprint` with PKCS1-PSS
4. **Enrollment**: POSTs to `/api/v1/unit/enroll` with identity, public key, and signature
5. **Token**: Receives JWT token for subsequent requests

### AP Reporting Strategy

For units with high pwned counts, reporting every AP individually is impractical. The generator uses intelligent sampling:

- **≤100**: Report all (100%)
- **101-1K**: Report up to 500 (50-100%)
- **1K-100K**: Report 1% of total
- **100K+**: Report 0.5-1% (max 5,000)

This maintains realistic statistics while keeping reporting time reasonable.

### Multi-Threading Architecture

```python
# Simplified threading logic
def report_initial_aps(self):
    aps_to_report = calculate_intelligent_sample(self.pwnd_tot)
    batch_size = aps_to_report // self.report_threads
    
    threads = []
    for i in range(self.report_threads):
        start = i * batch_size
        end = start + batch_size
        t = threading.Thread(target=self._report_ap_batch, args=(i+1, start, end))
        threads.append(t)
        t.start()
        time.sleep(0.1)  # Stagger thread starts
    
    for t in threads:
        t.join()
```

Each thread reports its batch independently while sharing the same authentication token and credentials.

## Real-World Use Cases

### Load Testing
Simulate hundreds of units enrolling simultaneously to test database connection pooling and API rate limits.

### Performance Profiling
Use high thread counts to identify bottlenecks in AP reporting endpoints.

### Anonymity Testing
Route all traffic through Tor to verify the system handles different exit nodes correctly.

### Edge Case Discovery
Create units with extreme stats (millions of networks) to find integer overflow or query performance issues.

### Development Iteration
Test new opwngrid features locally before deploying to production.

## Architecture Highlights

The project follows clean separation of concerns:

- **Generator**: Pure creation and simulation logic
- **Fleet Manager**: State management and lifecycle control
- **Web UI**: Presentation and real-time updates

All components share the same underlying unit representation, stored as JSON with separate PEM private keys.

## Performance Optimizations

**Intelligent Sampling**: Don't report all APs for high counts
**Thread Pooling**: Parallel requests with shared authentication
**Resumable State**: Skip already-reported APs on restart
**Rate Limiting**: Built-in delays to protect API servers
**Tor Circuit Reuse**: Persistent circuits across requests

## Documentation

The project includes comprehensive documentation:

- **INSTALL.md**: Installation guide for all platforms
- **FLEET-MANAGER.md**: Complete fleet manager documentation
- **MULTI-THREADING.md**: Threading feature deep dive
- **SYSTEM-OVERVIEW.md**: Architecture and design
- **CONVERSION-GUIDE.md**: Migrating from older versions

## Lessons Learned

**Authentication Matters**: Getting the cryptographic signing right was critical. The system had to match real Pwnagotchi behavior exactly.

**State Persistence**: Early versions lost data on crash. Implementing proper state saving/loading was essential for production use.

**Threading Challenges**: Balancing parallelism with API rate limits required careful tuning and progress tracking.

**Unicode Edge Cases**: Handling SSID encoding (especially non-ASCII characters) uncovered many edge cases in URL encoding and filename handling.

## Future Enhancements

The roadmap includes:

- Enhanced web dashboard with creation wizard
- Real-time log streaming via WebSocket
- Statistical analysis and visualization
- SQLite persistence layer for history
- Configuration profiles and templates

See `readmes/WEB-DASHBOARD-PLAN.md` for detailed specifications.

## Conclusion

Pwnagotchi Generator solves a real problem for anyone running or developing for the Pwnagotchi ecosystem. Whether you're load testing a grid deployment, developing new features, or just want to understand how the system works at scale, this toolkit provides the flexibility and authenticity you need.

The multi-threaded reporting alone makes it viable to test scenarios that would be impossible with single-threaded approaches. Combined with Tor support and comprehensive fleet management, you have everything needed for production-grade testing.

---

**Ready to test your grid?** Check out the [GitHub repository](https://github.com/4ngel2769/pwnagotchi-generator) and start building your synthetic fleet today.

**Star the repo** if you find it useful, and contributions are always welcome!
