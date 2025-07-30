---
title: 'Recursive Web Directory Downloader (rwdl) - Effortless Bulk File Downloads'
description: "Learn how to quickly download entire web directories or large file collections with rwdl, a Python CLI tool built for speed, reliability, and ease of use."
headline: 'RWDL: Fast, Reliable Bulk File Downloader for Web Directories'
excerpt: "Discover rwdl, a Python-powered CLI utility that makes downloading files from web directories (like archive.org) fast and painless. Learn why it was built, how it works, and how to use it."
date: '2025-07-30T12:00:00'
author: 'angeldev0'
authorUrl: 'https://i.imgur.com/5fOISXH.png'
tags: ['Web Scraping', 'CLI Tool', 'Python', 'Downloader']
socialImage:
    src: 'https://i.imgur.com/5fOISXH.png'
    mime: 'png'
    alt: 'Recursive Web Directory Downloader CLI screenshot'
    width: 1200
    height: 630
---

Have you ever needed to download dozens or even thousands of files from a web directory only to find that doing it by hand takes ages? I have. That's why I built **Recursive Web Directory Downloader** (`rwdl`): a simple CLI tool that makes downloading in bulk from sites like archive.org, software mirrors, or any Apache-style directory listing fast and easy.

## Why I Built RWDL

The inspiration for `rwdl` came from my own frustration. I often needed to mirror large collections of files from archive.org, research datasets, and up-to-date parrotOS ISOs. Existing tools were either too complex, too slow, or didn't handle recursion and filtering the way I wanted (or I haven't found one that does). I wanted something that:

- **Just works** with a single command
- Lets me filter by file extension (e.g., only `.iso` or `.exe`)
- Recursively grabs files while preserving directory structure
- Skips files I already have (for resuming interrupted downloads)
- Is cross-platform and easy to install

So I built `rwdl` for my needs, and it's open source for everyone! 🎉

## What Does RWDL Do?

`rwdl` is a command-line Python script that:

- **Recursively traverses web directories** (with configurable depth)
- **Downloads only the file types you want** (by extension)
- **Skips navigation and non-file links**
- **Mirrors the remote directory structure locally**
- **Avoids re-downloading files you already have**
- **Lets you control request delays** (to not bombard servers with requests)
- **Works on Windows, Linux, and macOS** (or any toaster that can run Python)

It's perfect for archiving, mirroring, or just grabbing a bunch of files from any site that lists them in a directory format.

## How to Use RWDL

### Installation

You'll need Python 3.8+ and `git`. Clone the repo and install dependencies:

```bash
git clone https://github.com/4ngel2769/rwdl.git
cd rwdl
pip install -r requirements.txt
```

### Basic Usage

Download all `.pdf` and `.epub` files from a directory (depth 1):

```bash
python rwdl.py \
  --url https://archive.org/download/somecollection/ \
  --extension .pdf,.epub \
  --output ./ebooks \
  --depth 1
```

### Full Options

```bash
python rwdl.py \
  --url https://example.com/files/ \    # Base URL to start downloading from
  --depth 3 \                           # Recursion depth (0=base only)
  --extension .torrent,.iso \           # File extensions to download
  --output ./downloads \                # Output directory
  --delay 0.5                           # Optional delay between requests
```

### Arguments

| Argument        | Short | Required | Default     | Description                                 |
|-----------------|-------|----------|-------------|---------------------------------------------|
| `--url`         | `-u`  | Yes      |             | Base URL to start downloading from          |
| `--extension`   | `-e`  | Yes      |             | Comma-separated file extensions to download |
| `--depth`       | `-d`  | No       | 1           | Recursion depth (0=base only)               |
| `--output`      | `-o`  | No       | ./downloads | Output base directory                       |
| `--delay`       |       | No       | 0.5         | Delay between requests in seconds           |
| `--help`        | `-h`  | No       |             | Show help message                           |
| `--version`     | `-v`  | No       |             | Show version and exit                       |

## How RWDL Works (Under the Hood)

RWDL uses a **breadth-first search (BFS)** algorithm to traverse web directories. It parses each directory page, finds all links, and queues up subdirectories and files for processing. It only downloads files that match your specified extensions, and it decodes URL-encoded filenames (so `%20` becomes a space, etc.) for proper local saving.

Here's a simplified version of the core logic:

```python
from collections import deque
import os, requests, urllib.parse
from bs4 import BeautifulSoup
from urllib.parse import urljoin

def is_valid_extension(filename, extensions):
    return any(filename.endswith(ext) for ext in extensions)

def parse_directory(url):
    resp = requests.get(url)
    soup = BeautifulSoup(resp.text, 'html.parser')
    return [a['href'] for a in soup.select('a[href]')]

def main():
    base_url = "https://example.com/files/"
    extensions = [".pdf", ".epub"]
    output_dir = "./downloads"
    queue = deque([(base_url, 0, output_dir)])
    visited = set()
    while queue:
        url, depth, local_base = queue.popleft()
        if url in visited: continue
        visited.add(url)
        links = parse_directory(url)
        for link in links:
            abs_url = urljoin(url, link)
            decoded = urllib.parse.unquote(link)
            if abs_url.endswith('/'):
                # Directory
                dir_name = os.path.basename(abs_url.rstrip('/'))
                dir_name = urllib.parse.unquote(dir_name)
                new_local = os.path.join(local_base, dir_name)
                os.makedirs(new_local, exist_ok=True)
                queue.append((abs_url, depth+1, new_local))
            else:
                # File
                filename = os.path.basename(abs_url)
                filename = urllib.parse.unquote(filename)
                if is_valid_extension(filename, extensions):
                    local_path = os.path.join(local_base, filename)
                    if not os.path.exists(local_path):
                        # Download file
                        with requests.get(abs_url, stream=True) as r:
                            with open(local_path, 'wb') as f:
                                for chunk in r.iter_content(8192):
                                    f.write(chunk)
```

## Key Features

- **URL decoding**: Handles spaces and special characters in filenames
- **Smart filtering**: Skips navigation and non-file links
- **Resumable**: Skips files you already have
- **Cross-platform**: Works anywhere Python does

## Output Structure

RWDL mirrors the remote directory structure locally. For example:

```
downloads/
├── folder1/
│   ├── file1.pdf
│   └── file2.pdf
├── folder2/
│   └── nested/
│       └── file3.epub
└── base_file.pdf
```

## Building RWDL: The Approach

I built RWDL with these principles:

- **Simplicity**: One script, minimal dependencies (`requests`, `beautifulsoup4`)
- **Reliability**: Handles network errors gracefully, skips broken links
- **Transparency**: Prints progress and what it's doing
- **Extensibility**: Easy to add new features or tweak for your own needs

The hardest part was handling all the weird edge cases in directory listings and making sure filenames were always saved correctly, even with spaces or Unicode characters.

## Conclusion

RWDL is my go-to tool for bulk downloading from web directories. Whether you're archiving research papers, grabbing ISOs, or mirroring open data, it saves you time and hassle. Give it a try—and feel free to contribute or suggest features!

---

*Ready to download? Check out the [GitHub repository](https://github.com/4ngel2769/rwdl) and start mirroring your favorite web