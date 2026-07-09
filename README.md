# ScoutVeil — AI Competitive Intelligence Platform

ScoutVeil is an AI-powered competitive intelligence platform built for early-stage 
B2B founders who need to know what their competitors are doing — without spending 
hours on manual research.

It owns one problem completely: the information gap between you and your 
competitors. ScoutVeil closes that gap automatically.

## What It Does

- **Signal Monitor** — Tracks competitor websites, pricing pages, and job postings 
  automatically, with a full timestamped change history per competitor
- **OSINT Intelligence Layer** — Passive, public-source monitoring including 
  subdomain discovery via certificate transparency logs, surfacing infrastructure 
  moves before they're publicly announced
- **AI Weekly Digest** — Turns the week's signals into a plain-language brief, 
  readable in under two minutes
- **Threat Scoring** — Every monitored competitor gets a Low / Medium / High 
  threat label with plain-language reasoning behind the score
- **Change History Log** — Full evidence trail per competitor, so you can replay 
  exactly how they've moved over time

## Tech Stack

### Client
- React + TypeScript
- Tailwind CSS
- Vite

### Server
- Express.js + TypeScript
- PostgreSQL
- Prisma ORM
- Playwright (website scraping/diffing)
- Anthropic API (AI digest generation)

## Built By

Kesther Ogbu — Full-Stack Developer & B2B SaaS Builder  
[kesther.vercel.app](https://kesther.vercel.app)