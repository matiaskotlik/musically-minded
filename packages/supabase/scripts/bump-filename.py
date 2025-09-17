#!/usr/bin/env python3

import os
import re
import sys

if len(sys.argv) < 2:
    print(f"Usage: {sys.argv[0]} [-r] <file1> [<file2> ...]")
    sys.exit(1)

args = sys.argv[1:]

try:
    direction = int(args[0])
    args.pop()
except ValueError:
    direction = 1

count = 0
for filename in args:
    match = re.match(r"^(\d\d)(.*)", filename)
    if match:
        num = int(match.group(1)) + direction
        new_name = f"{num:02d}{match.group(2)}"
        os.rename(filename, new_name)
        print(f"Renamed: {filename} → {new_name}")
        count += 1
print(f"Renamed {count} files.")
