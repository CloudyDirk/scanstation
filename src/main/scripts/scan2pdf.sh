#!/bin/bash
# Scan Images
 scanimage --mode Color --depth 8 --resolution 200 -x 210 -y 297  > document.pnm

# Delete last image as it is invalid
ls out*.pnm | sort | tail -1 | xargs rm

# Create TIFFs
echo "Creating TIFF images..."
ls out*.pnm | while read p; do echo $p; q=`echo $p | sed 's/out\(.*\)\.pnm/tiff\1.tif/'`; echo $q; cat $p | pnmrotate -noantialias -90 | pnmtotiff -lzw > $q; done

# Create one big TIFF
echo "Combining TIFF images..."
tiffcp -c lzw tiff* document.tif

# Create PDF
echo "Creating PDF document..."
tiff2pdf -z document.tif -o document.pdf -a "Dirk Guenther"

echo "Optimizing PDF..."
pdfopt document.pdf document_opt.pdf

echo "Cleaning up..."
rm *.pnm
rm tiff*
rm document.tif
rm document.pdf
