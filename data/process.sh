#!/bin/bash


# Process the CIEDE2000 Testdata
# -------------------------------------------
rm ciede2000testdata.json
# cp ciede2000testdata.txt ciede2000testdata.json

# wrap in json structure
echo 'var ciede2000testdata = [' > ciede2000testdata.json
cat  ciede2000testdata.txt >> ciede2000testdata.json
echo '];' >> ciede2000testdata.json

# split csv to json
perl -pi -e "s/([\.0-9\-]+)[ \t]+([\.0-9\-]+)[ \t]+([\.0-9\-]+)[ \t]+([\.0-9\-]+)[ \t]+([\.0-9\-]+)[ \t]+([\.0-9\-]+)[ \t]+([\.0-9\-]+)/\t{L1:\1,a1:\2,b1:\3,L2:\4,a2:\5,b2:\6,dE:\7},/" ciede2000testdata.json

# delete empty lines
perl -pi -0 -e "s/\\n+/\\n/g" ciede2000testdata.json

# no coma for last line
perl -pi -0 -e "s/\},\n*\]/\}\n\]/" ciede2000testdata.json



# Process the FOGRA39L.txt
# -------------------------------------------


rm FOGRA39L.json
# cp ciede2000testdata.txt ciede2000testdata.json

# wrap in json structure
echo 'var FOGRA39L = [' > FOGRA39L.json
# just extract the data by linenumber
sed -n '13,1629p' FOGRA39L.txt >> FOGRA39L.json
echo '];' >> FOGRA39L.json

# split csv to json
perl -pi -e "s/([\.0-9\-]+)[ ]+([\.0-9\-]+)[ ]+([\.0-9\-]+)[ ]+([\.0-9\-]+)[ ]+([\.0-9\-]+)[ ]+([\.0-9\-]+)[ ]+([\.0-9\-]+)[ ]+([\.0-9\-]+)[ ]+([\.0-9\-]+)[ ]+([\.0-9\-]+)[ ]+([\.0-9\-]+)/\t{SAMPLE_ID: \1, CMYK_C: \2, CMYK_M: \3, CMYK_Y: \4, CMYK_K: \5, XYZ_X: \6, XYZ_Y: \7, XYZ_Z: \8, LAB_L: \$9, LAB_A: \$10, LAB_B: \$11},/" FOGRA39L.json

# delete empty lines
perl -pi -0 -e "s/\\n+/\\n/g" FOGRA39L.json

# no coma for last line
perl -pi -0 -e "s/\},\n*\]/\}\n\]/" FOGRA39L.json