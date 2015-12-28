#!/bin/bash
# Scan Images
scandir=/home/pi/scanstation/scans
scanimage --mode Color --depth 8 --resolution 200 -x 210 -y 297  > $scandir/page01.pnm
