---
title: 'YouTube Transcript Search Tool - Powerful CLI for Video Content Discovery | Blog'
description: "Discover how to search YouTube video transcripts with yttr-search, a powerful CLI tool that supports channel scanning, keyword highlighting, and batch processing."
headline: 'YTTR-Search: A Powerful CLI for YouTube Transcript Search'
excerpt: "Learn about yttr-search, an open-source CLI utility that makes searching YouTube video transcripts effortless with features like channel scanning, keyword highlighting, and batch processing."
date: '2025-06-29T12:00:00'
dateUpdated: ''
author: 'angeldev0'
authorUrl: 'https://github.com/4ngel2769/yttr-search'
tags: ['YouTube', 'CLI Tool', 'Transcript Search', 'Python']
socialImage:
    src: 'https://i.imgur.com/a6kegiy.png'
    mime: 'png'
    alt: 'YouTube Transcript Search Tool CLI interface'
    width: 1200
    height: 630
---

Have you ever found yourself scrubbing through hours of YouTube videos, desperately trying to find that one quote, story, or technical explanation you vaguely remember? I have—and it's exactly why I built the **YouTube Transcript Search Tool** (`yttr-search`).

## Why I Built yttr-search

I made this tool out of a real need: to find that one thing someone said in that one 2-hour podcast that I just couldn't locate. YouTube is a goldmine of information, but its search is limited to titles and descriptions—not the actual spoken content. I wanted a way to scan entire channels, single videos, or even a batch of links, searching the transcripts for my keywords or phrases. I wanted to see matches in context, get jump-to links with timestamps, and have a slick progress bar showing me how far along I was. So, I built it.

## What Does yttr-search Do?

`yttr-search` is a command-line tool that lets you:

- **Scan YouTube channels, single videos, or a batch of links**
- **Search transcripts for your keywords or phrases**
- **Highlight matches in context**
- **Print jump-to links with timestamps**
- **Show a progress bar as it works**

It's designed to make content discovery on YouTube as fast and painless as possible, whether you're a researcher, a content creator, or just someone who wants to find that one moment in a sea of video content.

## The Story Behind the Tool

The idea came from frustration. I'd be watching a long-form interview or podcast, remember a guest saying something important, and then spend ages trying to find it again. YouTube's built-in search just wasn't enough. I wanted to search the actual words spoken in the video, not just the metadata. That's when I realized: with transcripts and a bit of Python, I could build the tool I needed.

## Key Features

The tool comes packed with features that make transcript searching both powerful and user-friendly:

- **Full channel scanning** via YouTube Data API
- **Multiple input methods**: channel URL/handle/ID, single video URL, or batch file
- **Smart keyword highlighting** with colored backgrounds
- **Duration filtering** to include/exclude videos by length
- **Flexible sorting** options (newest, oldest, most popular)
- **Progress tracking** with visual progress bars
- **Timestamped jump-links** for easy navigation

## Installation and Setup

Getting started with yttr-search is straightforward:

```bash
# Clone the repository
git clone https://github.com/4ngel2769/yttr-search.git
cd yttr-search

# Install dependencies
pip install -r requirements.txt

# Set up your YouTube API key
cp .env.example .env
# Edit .env and add your YouTube API key
```

### Requirements

The tool requires Python 3.13+ and uses these key dependencies:

```python
youtube_transcript_api
python-dotenv
google-api-python-client
isodate
```

## Usage Examples

Here's how you can use `yttr-search` in your own workflow:

### Basic Channel Search

Search for specific keywords across an entire YouTube channel:

```bash
python yttrsch.py \
  -k "machine learning,AI" \
  -c "@channelname" \
  -m 100 \
  -s newest
```

This command searches for "machine learning" or "AI" in the newest 100 videos from the specified channel.

### Advanced Filtering

You can combine multiple filters for precise results:

```bash
python yttrsch.py \
  -k "tutorial" \
  -c "UC1234567890" \
  -x "+5m" -x "-30m" \
  -s popular
```

This searches for "tutorial" in videos that are longer than 5 minutes but shorter than 30 minutes, sorted by popularity.

### Batch Processing

Process multiple video URLs from a file:

```bash
python yttrsch.py \
  -k "review,comparison" \
  -f example_links.txt
```

## Technical Implementation

### Architecture Overview

The tool is built with a modular architecture that handles:

1. **Input parsing** for various YouTube URL formats
2. **API integration** with YouTube Data API v3
3. **Transcript fetching** using youtube-transcript-api
4. **Text processing** with regex-based keyword matching
5. **Output formatting** with ANSI color codes

### Key Components

#### Channel Resolution
```python
def parse_channel_input(youtube, raw):
    """
    Accepts:
      • raw channel ID (UC…)
      • bare handle (@name)  
      • full channel URL or @handle URL
    and returns the proper UC… ID.
    """
```

#### Progress Tracking
The tool features a real-time progress bar that updates as videos are processed:

```python
def update_progress(current, total, width=40, prefix="Processing"):
    """Prints an in-place progress bar that stays at the bottom."""
    pct = current / total
    filled = int(pct * width)
    bar = f"[{'=' * filled}{' ' * (width - filled)}]"
```

#### Keyword Highlighting
Each keyword gets its own color for easy identification:

```python
KEY_COLORS = [BG_CYAN, BG_LIME, BG_RED, BG_GREEN]

def highlight(text, keywords):
    """Highlight each keyword with a colored background."""
    for idx, kw in enumerate(keywords):
        # Apply color highlighting logic
```

## Output Format

The tool provides structured, colorized output that includes:

1. **Video titles** in blue
2. **Timestamped jump-links** in yellow 
3. **Highlighted keywords** with colored backgrounds
4. **Context snippets** showing surrounding text

Example output:
```
My Example Video Title

https://www.youtube.com/watch?v=XYZ123&t=15s  (00:15)
  ...let's discuss the [machine learning] algorithm...

https://www.youtube.com/watch?v=XYZ123&t=75s  (01:15)  
  ...this [AI] model performs exceptionally well...
```

## Contributing and License

yttr-search is open-source software released under the MIT License. Contributions are welcome! The project follows standard GitHub workflow:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Development Guidelines

- Follow existing code style and conventions
- Write clear, descriptive commit messages
- Test your changes thoroughly
- Keep features focused and modular

## Future Enhancements

The roadmap for yttr-search includes several exciting features:

- **Export functionality** for search results
- **Advanced regex support** for complex pattern matching  
- **Sentiment analysis** integration
- **Multi-language support** for international content
- **Web interface** for non-CLI users

## Conclusion

The YouTube Transcript Search Tool demonstrates how powerful CLI utilities can solve real-world content discovery problems. By combining the YouTube Data API with transcript processing, it provides researchers, content creators, and curious users with an efficient way to find specific information across video content.

Whether you're researching topics, fact-checking quotes, or analyzing content trends, yttr-search offers the tools you need in a fast, reliable package.

---

*Ready to start searching? Check out the [GitHub repository](https://github.com/4ngel2769/yttr-search) and give it a try!*