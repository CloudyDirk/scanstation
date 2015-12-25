#!/bin/bash
# Stop scan
ls ../scans/page*.pnm | while read p; do echo $p; q=`echo $p | sed 's/page\(.*\)\.pnm/tiff\1.tif/'`; echo $q; cat $p | pnmtotiff -lzw > $q; done

tiffcp -c lzw ../scans/tiff* ../scans/document.tif

tiff2pdf -z ../scans/document.tif -o ../scans/document.pdf -a "Dirk Guenther"

pdfopt ../scans/document.pdf ../scans/document_opt.pdf

rm *.pnm
rm tiff*
rm document.tif
rm document.pdf
