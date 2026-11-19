---
layout: default
title: Level System
permalink: /level-system/
nav_order: 1
---
# Level System

Start at **level 1** and progress to **level 60** by earning experience from eligible creature kills. The HUD shows your level, progress toward the next level and unspent stat points. Click the progression display to open the level window.

## Experience

The XP needed to reach the next level is **4 × next level² + 10**. This is the cost of that individual step, not a cumulative total.

| Next level | XP for that step |
|---|---:|
| 2 | 26 |
| 10 | 410 |
| 20 | 1,610 |
| 30 | 3,610 |
| 40 | 6,410 |
| 50 | 10,010 |
| 60 | 14,410 |

Creature XP is a shared kill budget. Damage contribution and eligible party members determine how that budget is divided; a party does not multiply it. See [Party System]({{ '/party-system/' | relative_url }}).

## Level rewards

- Each level gained awards **5 stat points**.
- Levels divisible by three award **5 additional stat points**.
- Reaching level 60 awards a further **5 stat points**.
- Each level gained also adds **1 skill point** to your saved balance. The skill tree currently previews abilities; it does not spend these points or impose unlock paths.

Spend stat points in the progression window. Base limits are **400 STR, 200 DEX and 100 INT**. Equipment bonuses are separate.

## Titles

| Level | Title |
|---|---|
| 1–9 | Novice |
| 10–19 | Journeyman |
| 20–29 | Expert |
| 30–39 | Adept |
| 40–49 | Master |
| 50–60 | Grandmaster |

Use `.RilaLevel` to open the level window, or follow [Getting Started]({{ '/new-player-helper/' | relative_url }}) for the main controls.
