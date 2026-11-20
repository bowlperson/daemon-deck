// Standard Lucide symbols, unmodified; the same family used by the existing library.
// Bear Face and Shades: Lucide Lab, commit 34b6526d0a67bbe67b8a54b9b101018b1377ef28.
// ISC license and attribution: icons-LICENSE.txt. Saved enemy icon IDs stay stable.
import {enemies} from './dungeon-enemies.js';
const symbols=[
  {
    "id": "dd:enemy-0",
    "symbol": "axe",
    "source": "lucide:axe",
    "markup": "<path d=\"m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9\" />\n  <path d=\"M15 13 9 7l4-4 6 6h3a8 8 0 0 1-7 7z\" />"
  },
  {
    "id": "dd:enemy-1",
    "symbol": "atom",
    "source": "lucide:atom",
    "markup": "<circle cx=\"12\" cy=\"12\" r=\"1\" />\n  <path d=\"M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z\" />\n  <path d=\"M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z\" />"
  },
  {
    "id": "dd:enemy-2",
    "symbol": "biceps-flexed",
    "source": "lucide:biceps-flexed",
    "markup": "<path d=\"M12.409 13.017A5 5 0 0 1 22 15c0 3.866-4 7-9 7-4.077 0-8.153-.82-10.371-2.462-.426-.316-.631-.832-.62-1.362C2.118 12.723 2.627 2 10 2a3 3 0 0 1 3 3 2 2 0 0 1-2 2c-1.105 0-1.64-.444-2-1\" />\n  <path d=\"M15 14a5 5 0 0 0-7.584 2\" />\n  <path d=\"M9.964 6.825C8.019 7.977 9.5 13 8 15\" />"
  },
  {
    "id": "dd:enemy-3",
    "symbol": "package",
    "source": "lucide:package",
    "markup": "<path d=\"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z\" />\n  <path d=\"M12 22V12\" />\n  <path d=\"m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7\" />\n  <path d=\"m7.5 4.27 9 5.15\" />"
  },
  {
    "id": "dd:enemy-4",
    "symbol": "megaphone",
    "source": "lucide:megaphone",
    "markup": "<path d=\"m3 11 18-5v12L3 14v-3z\" />\n  <path d=\"M11.6 16.8a3 3 0 1 1-5.8-1.6\" />"
  },
  {
    "id": "dd:enemy-5",
    "symbol": "ticket",
    "source": "lucide:ticket",
    "markup": "<path d=\"M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z\" />\n  <path d=\"M13 5v2\" />\n  <path d=\"M13 17v2\" />\n  <path d=\"M13 11v2\" />"
  },
  {
    "id": "dd:enemy-6",
    "symbol": "shield-half",
    "source": "lucide:shield-half",
    "markup": "<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\" />\n  <path d=\"M12 22V2\" />"
  },
  {
    "id": "dd:enemy-7",
    "symbol": "flask-conical",
    "source": "lucide:flask-conical",
    "markup": "<path d=\"M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2\" />\n  <path d=\"M6.453 15h11.094\" />\n  <path d=\"M8.5 2h7\" />"
  },
  {
    "id": "dd:enemy-8",
    "symbol": "flashlight",
    "source": "lucide:flashlight",
    "markup": "<path d=\"M18 6c0 2-2 2-2 4v10a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V10c0-2-2-2-2-4V2h12z\" />\n  <line x1=\"6\" x2=\"18\" y1=\"6\" y2=\"6\" />\n  <line x1=\"12\" x2=\"12\" y1=\"12\" y2=\"12\" />"
  },
  {
    "id": "dd:enemy-9",
    "symbol": "pill-bottle",
    "source": "lucide:pill-bottle",
    "markup": "<path d=\"M18 11h-4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4\" />\n  <path d=\"M6 7v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7\" />\n  <rect width=\"16\" height=\"5\" x=\"4\" y=\"2\" rx=\"1\" />"
  },
  {
    "id": "dd:enemy-10",
    "symbol": "binoculars",
    "source": "lucide:binoculars",
    "markup": "<path d=\"M10 10h4\" />\n  <path d=\"M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3\" />\n  <path d=\"M20 21a2 2 0 0 0 2-2v-3.851c0-1.39-2-2.962-2-4.829V8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2z\" />\n  <path d=\"M 22 16 L 2 16\" />\n  <path d=\"M4 21a2 2 0 0 1-2-2v-3.851c0-1.39 2-2.962 2-4.829V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2z\" />\n  <path d=\"M9 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3\" />"
  },
  {
    "id": "dd:enemy-11",
    "symbol": "bone",
    "source": "lucide:bone",
    "markup": "<path d=\"M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z\" />"
  },
  {
    "id": "dd:enemy-12",
    "symbol": "cable",
    "source": "lucide:cable",
    "markup": "<path d=\"M17 21v-2a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1\" />\n  <path d=\"M19 15V6.5a1 1 0 0 0-7 0v11a1 1 0 0 1-7 0V9\" />\n  <path d=\"M21 21v-2h-4\" />\n  <path d=\"M3 5h4V3\" />\n  <path d=\"M7 5a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a1 1 0 0 1 1-1V3\" />"
  },
  {
    "id": "dd:enemy-13",
    "symbol": "radio-tower",
    "source": "lucide:radio-tower",
    "markup": "<path d=\"M4.9 16.1C1 12.2 1 5.8 4.9 1.9\" />\n  <path d=\"M7.8 4.7a6.14 6.14 0 0 0-.8 7.5\" />\n  <circle cx=\"12\" cy=\"9\" r=\"2\" />\n  <path d=\"M16.2 4.8c2 2 2.26 5.11.8 7.47\" />\n  <path d=\"M19.1 1.9a9.96 9.96 0 0 1 0 14.1\" />\n  <path d=\"M9.5 18h5\" />\n  <path d=\"m8 22 4-11 4 11\" />"
  },
  {
    "id": "dd:enemy-14",
    "symbol": "pickaxe",
    "source": "lucide:pickaxe",
    "markup": "<path d=\"M14.531 12.469 6.619 20.38a1 1 0 1 1-3-3l7.912-7.912\" />\n  <path d=\"M15.686 4.314A12.5 12.5 0 0 0 5.461 2.958 1 1 0 0 0 5.58 4.71a22 22 0 0 1 6.318 3.393\" />\n  <path d=\"M17.7 3.7a1 1 0 0 0-1.4 0l-4.6 4.6a1 1 0 0 0 0 1.4l2.6 2.6a1 1 0 0 0 1.4 0l4.6-4.6a1 1 0 0 0 0-1.4z\" />\n  <path d=\"M19.686 8.314a12.501 12.501 0 0 1 1.356 10.225 1 1 0 0 1-1.751-.119 22 22 0 0 0-3.393-6.319\" />"
  },
  {
    "id": "dd:enemy-15",
    "symbol": "fish",
    "source": "lucide:fish",
    "markup": "<path d=\"M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z\" />\n  <path d=\"M18 12v.5\" />\n  <path d=\"M16 17.93a9.77 9.77 0 0 1 0-11.86\" />\n  <path d=\"M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33\" />\n  <path d=\"M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4\" />\n  <path d=\"m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98\" />"
  },
  {
    "id": "dd:enemy-16",
    "symbol": "paw-print",
    "source": "lucide:paw-print",
    "markup": "<circle cx=\"11\" cy=\"4\" r=\"2\" />\n  <circle cx=\"18\" cy=\"8\" r=\"2\" />\n  <circle cx=\"20\" cy=\"16\" r=\"2\" />\n  <path d=\"M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z\" />"
  },
  {
    "id": "dd:enemy-17",
    "symbol": "notebook-pen",
    "source": "lucide:notebook-pen",
    "markup": "<path d=\"M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4\" />\n  <path d=\"M2 6h4\" />\n  <path d=\"M2 10h4\" />\n  <path d=\"M2 14h4\" />\n  <path d=\"M2 18h4\" />\n  <path d=\"M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z\" />"
  },
  {
    "id": "dd:enemy-18",
    "symbol": "wrench",
    "source": "lucide:wrench",
    "markup": "<path d=\"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z\" />"
  },
  {
    "id": "dd:enemy-19",
    "symbol": "pill",
    "source": "lucide:pill",
    "markup": "<path d=\"m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z\" />\n  <path d=\"m8.5 8.5 7 7\" />"
  },
  {
    "id": "dd:enemy-20",
    "symbol": "scissors",
    "source": "lucide:scissors",
    "markup": "<circle cx=\"6\" cy=\"6\" r=\"3\" />\n  <path d=\"M8.12 8.12 12 12\" />\n  <path d=\"M20 4 8.12 15.88\" />\n  <circle cx=\"6\" cy=\"18\" r=\"3\" />\n  <path d=\"M14.8 14.8 20 20\" />"
  },
  {
    "id": "dd:enemy-21",
    "symbol": "pocket-knife",
    "source": "lucide:pocket-knife",
    "markup": "<path d=\"M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2-2 1-2 2 2 1 2 2\" />\n  <path d=\"M18 6h.01\" />\n  <path d=\"M6 18h.01\" />\n  <path d=\"M20.83 8.83a4 4 0 0 0-5.66-5.66l-12 12a4 4 0 1 0 5.66 5.66Z\" />\n  <path d=\"M18 11.66V22a4 4 0 0 0 4-4V6\" />"
  },
  {
    "id": "dd:enemy-22",
    "symbol": "flame",
    "source": "lucide:flame",
    "markup": "<path d=\"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z\" />"
  },
  {
    "id": "dd:enemy-23",
    "symbol": "radiation",
    "source": "lucide:radiation",
    "markup": "<path d=\"M12 12h.01\" />\n  <path d=\"M7.5 4.2c-.3-.5-.9-.7-1.3-.4C3.9 5.5 2.3 8.1 2 11c-.1.5.4 1 1 1h5c0-1.5.8-2.8 2-3.4-1.1-1.9-2-3.5-2.5-4.4z\" />\n  <path d=\"M21 12c.6 0 1-.4 1-1-.3-2.9-1.8-5.5-4.1-7.1-.4-.3-1.1-.2-1.3.3-.6.9-1.5 2.5-2.6 4.3 1.2.7 2 2 2 3.5h5z\" />\n  <path d=\"M7.5 19.8c-.3.5-.1 1.1.4 1.3 2.6 1.2 5.6 1.2 8.2 0 .5-.2.7-.8.4-1.3-.5-.9-1.4-2.5-2.5-4.3-1.2.7-2.8.7-4 0-1.1 1.8-2 3.4-2.5 4.3z\" />"
  },
  {
    "id": "dd:enemy-24",
    "symbol": "gem",
    "source": "lucide:gem",
    "markup": "<path d=\"M6 3h12l4 6-10 13L2 9Z\" />\n  <path d=\"M11 3 8 9l4 13 4-13-3-6\" />\n  <path d=\"M2 9h20\" />"
  },
  {
    "id": "dd:enemy-25",
    "symbol": "dice-5",
    "source": "lucide:dice-5",
    "markup": "<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\" ry=\"2\" />\n  <path d=\"M16 8h.01\" />\n  <path d=\"M8 8h.01\" />\n  <path d=\"M8 16h.01\" />\n  <path d=\"M16 16h.01\" />\n  <path d=\"M12 12h.01\" />"
  },
  {
    "id": "dd:enemy-26",
    "symbol": "bike",
    "source": "lucide:bike",
    "markup": "<circle cx=\"18.5\" cy=\"17.5\" r=\"3.5\" />\n  <circle cx=\"5.5\" cy=\"17.5\" r=\"3.5\" />\n  <circle cx=\"15\" cy=\"5\" r=\"1\" />\n  <path d=\"M12 17.5V14l-3-3 4-3 2 3h2\" />"
  },
  {
    "id": "dd:enemy-27",
    "symbol": "telescope",
    "source": "lucide:telescope",
    "markup": "<path d=\"m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44\" />\n  <path d=\"m13.56 11.747 4.332-.924\" />\n  <path d=\"m16 21-3.105-6.21\" />\n  <path d=\"M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z\" />\n  <path d=\"m6.158 8.633 1.114 4.456\" />\n  <path d=\"m8 21 3.105-6.21\" />\n  <circle cx=\"12\" cy=\"13\" r=\"2\" />"
  },
  {
    "id": "dd:enemy-28",
    "symbol": "utensils",
    "source": "lucide:utensils",
    "markup": "<path d=\"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2\" />\n  <path d=\"M7 2v20\" />\n  <path d=\"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7\" />"
  },
  {
    "id": "dd:enemy-29",
    "symbol": "key-round",
    "source": "lucide:key-round",
    "markup": "<path d=\"M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z\" />\n  <circle cx=\"16.5\" cy=\"7.5\" r=\".5\" fill=\"currentColor\" />"
  },
  {
    "id": "dd:enemy-30",
    "symbol": "cpu",
    "source": "lucide:cpu",
    "markup": "<rect width=\"16\" height=\"16\" x=\"4\" y=\"4\" rx=\"2\" />\n  <rect width=\"6\" height=\"6\" x=\"9\" y=\"9\" rx=\"1\" />\n  <path d=\"M15 2v2\" />\n  <path d=\"M15 20v2\" />\n  <path d=\"M2 15h2\" />\n  <path d=\"M2 9h2\" />\n  <path d=\"M20 15h2\" />\n  <path d=\"M20 9h2\" />\n  <path d=\"M9 2v2\" />\n  <path d=\"M9 20v2\" />"
  },
  {
    "id": "dd:enemy-31",
    "symbol": "test-tube-diagonal",
    "source": "lucide:test-tube-diagonal",
    "markup": "<path d=\"M21 7 6.82 21.18a2.83 2.83 0 0 1-3.99-.01a2.83 2.83 0 0 1 0-4L17 3\" />\n  <path d=\"m16 2 6 6\" />\n  <path d=\"M12 16H4\" />"
  },
  {
    "id": "dd:enemy-32",
    "symbol": "anchor",
    "source": "lucide:anchor",
    "markup": "<path d=\"M12 22V8\" />\n  <path d=\"M5 12H2a10 10 0 0 0 20 0h-3\" />\n  <circle cx=\"12\" cy=\"5\" r=\"3\" />"
  },
  {
    "id": "dd:enemy-33",
    "symbol": "bomb",
    "source": "lucide:bomb",
    "markup": "<circle cx=\"11\" cy=\"13\" r=\"9\" />\n  <path d=\"M14.35 4.65 16.3 2.7a2.41 2.41 0 0 1 3.4 0l1.6 1.6a2.4 2.4 0 0 1 0 3.4l-1.95 1.95\" />\n  <path d=\"m22 2-1.5 1.5\" />"
  },
  {
    "id": "dd:enemy-34",
    "symbol": "fuel",
    "source": "lucide:fuel",
    "markup": "<line x1=\"3\" x2=\"15\" y1=\"22\" y2=\"22\" />\n  <line x1=\"4\" x2=\"14\" y1=\"9\" y2=\"9\" />\n  <path d=\"M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18\" />\n  <path d=\"M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5\" />"
  },
  {
    "id": "dd:enemy-35",
    "symbol": "bug",
    "source": "lucide:bug",
    "markup": "<path d=\"m8 2 1.88 1.88\" />\n  <path d=\"M14.12 3.88 16 2\" />\n  <path d=\"M9 7.13v-1a3.003 3.003 0 1 1 6 0v1\" />\n  <path d=\"M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6\" />\n  <path d=\"M12 20v-9\" />\n  <path d=\"M6.53 9C4.6 8.8 3 7.1 3 5\" />\n  <path d=\"M6 13H2\" />\n  <path d=\"M3 21c0-2.1 1.7-3.9 3.8-4\" />\n  <path d=\"M20.97 5c0 2.1-1.6 3.8-3.5 4\" />\n  <path d=\"M22 13h-4\" />\n  <path d=\"M17.2 17c2.1.1 3.8 1.9 3.8 4\" />"
  },
  {
    "id": "dd:enemy-36",
    "symbol": "rat",
    "source": "lucide:rat",
    "markup": "<path d=\"M17 5c0-1.7-1.3-3-3-3s-3 1.3-3 3c0 .8.3 1.5.8 2H11c-3.9 0-7 3.1-7 7c0 2.2 1.8 4 4 4\" />\n  <path d=\"M16.8 3.9c.3-.3.6-.5 1-.7 1.5-.6 3.3.1 3.9 1.6.6 1.5-.1 3.3-1.6 3.9l1.6 2.8c.2.3.2.7.2 1-.2.8-.9 1.2-1.7 1.1 0 0-1.6-.3-2.7-.6H17c-1.7 0-3 1.3-3 3\" />\n  <path d=\"M13.2 18a3 3 0 0 0-2.2-5\" />\n  <path d=\"M13 22H4a2 2 0 0 1 0-4h12\" />\n  <path d=\"M16 9h.01\" />"
  },
  {
    "id": "dd:enemy-37",
    "symbol": "dog",
    "source": "lucide:dog",
    "markup": "<path d=\"M11.25 16.25h1.5L12 17z\" />\n  <path d=\"M16 14v.5\" />\n  <path d=\"M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309\" />\n  <path d=\"M8 14v.5\" />\n  <path d=\"M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5\" />"
  },
  {
    "id": "dd:enemy-38",
    "symbol": "bear-face",
    "source": "lucide-lab:bear-face",
    "markup": "<path d=\"m6 7 .5.5\" />\n  <path d=\"m18 7-.5.5\" />\n  <path d=\"M20.8 4.2c-1.6-1.6-4.1-1.6-5.7 0l-1 1a13.6 13.6 0 0 0-4.2 0l-1-1a4 4 0 0 0-5.8 5.55A7 7 0 0 0 2 13.5C2 18.2 6.5 22 12 22s10-3.8 10-8.5a7 7 0 0 0-1.1-3.8c1.5-1.6 1.5-4-.1-5.5\" />\n  <path d=\"M10 12v-.5\" />\n  <path d=\"M14 12v-.5\" />\n  <path d=\"M14 16h-4\" />\n  <path d=\"M12 16v2\" />"
  },
  {
    "id": "dd:enemy-39",
    "symbol": "bot",
    "source": "lucide:bot",
    "markup": "<path d=\"M12 8V4H8\" />\n  <rect width=\"16\" height=\"12\" x=\"4\" y=\"8\" rx=\"2\" />\n  <path d=\"M2 14h2\" />\n  <path d=\"M20 14h2\" />\n  <path d=\"M15 13v2\" />\n  <path d=\"M9 13v2\" />"
  },
  {
    "id": "dd:enemy-40",
    "symbol": "bot-message-square",
    "source": "lucide:bot-message-square",
    "markup": "<path d=\"M12 6V2H8\" />\n  <path d=\"m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z\" />\n  <path d=\"M2 12h2\" />\n  <path d=\"M9 11v2\" />\n  <path d=\"M15 11v2\" />\n  <path d=\"M20 12h2\" />"
  },
  {
    "id": "dd:enemy-41",
    "symbol": "scan-eye",
    "source": "lucide:scan-eye",
    "markup": "<path d=\"M3 7V5a2 2 0 0 1 2-2h2\" />\n  <path d=\"M17 3h2a2 2 0 0 1 2 2v2\" />\n  <path d=\"M21 17v2a2 2 0 0 1-2 2h-2\" />\n  <path d=\"M7 21H5a2 2 0 0 1-2-2v-2\" />\n  <circle cx=\"12\" cy=\"12\" r=\"1\" />\n  <path d=\"M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0\" />"
  },
  {
    "id": "dd:enemy-42",
    "symbol": "skull",
    "source": "lucide:skull",
    "markup": "<path d=\"m12.5 17-.5-1-.5 1h1z\" />\n  <path d=\"M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z\" />\n  <circle cx=\"15\" cy=\"12\" r=\"1\" />\n  <circle cx=\"9\" cy=\"12\" r=\"1\" />"
  }
];
export const enemyIcons=symbols.map((icon,i)=>({...icon,label:enemies[i].name+' · '+icon.symbol.replaceAll('-',' ')}));
export const shadesIcon={
  "id": "dd:shades",
  "label": "Shades \u00b7 COOL",
  "source": "lucide-lab:glasses-sun",
  "markup": "<path d=\"m2.16 14.2 3.1-7.4C5.7 5.8 6.8 5 8 5\" />\n  <path d=\"M4 13a2 2 0 0 0-2 2v1c0 1.7 1.3 3 3 3h1c3.3 0 6-2.7 6-6 0 3.3 2.7 6 6 6h1c1.7 0 3-1.3 3-3v-1a2 2 0 0 0-2-2Z\" />\n  <path d=\"m21.83 14.2-3.1-7.4C18.3 5.8 17.2 5 16 5\" />"
};
