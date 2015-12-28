#!/bin/bash
# Stop scan

scandir=/home/pi/scanstation/scans


ls $scandir/page*.pnm | while read p; do echo $p; q=`echo $p | sed 's/page\(.*\)\.pnm/tiff\1.tif/'`; echo $q; cat $p | pnmtotiff -lzw > $q; done

tiffcp -c lzw $scandir/tiff* $scandir/document.tif

tiff2pdf -z $scandir/document.tif -o $scandir/document.pdf -a "Dirk Guenther"

pdfopt $scandir/document.pdf $scandir/document_opt.pdf

rm $scandir/*.pnm
rm $scandir/tiff*
rm $scandir/document.tif
rm $scandir/document.pdf
