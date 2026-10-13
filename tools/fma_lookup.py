#!/usr/bin/env python3
"""
FMA Anatomical Lookup Utility
Allows command-line searching and inspection of 2,234 anatomical models
by anatomical name, FMA ID, BP representation ID, or anatomical category.
"""

import os
import sys
import json
import argparse

CATALOG_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'models_catalog.json')

def load_catalog():
    if not os.path.exists(CATALOG_PATH):
        print(f"Error: Catalog not found at {CATALOG_PATH}", file=sys.stderr)
        sys.exit(1)
    with open(CATALOG_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)

def search_catalog(query, system_filter=None):
    catalog = load_catalog()
    q = query.strip().lower()
    results = []
    
    for item in catalog:
        if system_filter and item.get('category') != system_filter:
            continue
        
        name = item.get('english_name', '').lower()
        fma = item.get('concept_id', '').lower()
        bp = item.get('representation_id', '').lower()
        fid = item.get('file_id', '').lower()
        
        if q in name or q == fma or q == bp or q == fid:
            results.append(item)
            
    return results

def print_summary(catalog):
    print("=" * 65)
    print("         HUMAN ANATOMY 3D MODELS CATALOG SUMMARY         ")
    print("=" * 65)
    print(f"Total Anatomical Models : {len(catalog):,}")
    
    systems = {}
    total_vol = 0.0
    total_size = 0
    for item in catalog:
        cat = item.get('category', 'Other')
        systems[cat] = systems.get(cat, 0) + 1
        total_vol += item.get('volume_cm3', 0.0)
        total_size += item.get('size_bytes', 0)
        
    print(f"Total Geometric Volume  : {total_vol:,.2f} cm³")
    print(f"Total Mesh Storage Size : {total_size / (1024 * 1024):.2f} MB")
    print("\nAnatomical Systems Breakdown:")
    for cat, count in sorted(systems.items(), key=lambda x: -x[1]):
        pct = (count / len(catalog)) * 100
        print(f"  - {cat:<32}: {count:>4} models ({pct:4.1f}%)")
    print("=" * 65)

def main():
    parser = argparse.ArgumentParser(description="Search Human Anatomy 3D Models by name, FMA ID, or BP ID.")
    parser.add_argument("query", nargs="?", help="Search term (e.g. 'aorta', 'femur', 'FMA3734', 'BP10374')")
    parser.add_argument("--system", "-s", help="Filter by anatomical system (e.g. 'Cardiovascular System', 'Skeletal System')")
    parser.add_argument("--summary", action="store_true", help="Print overall catalog statistics")
    parser.add_argument("--limit", "-n", type=int, default=20, help="Maximum number of search results to display (default: 20)")
    
    args = parser.parse_args()
    catalog = load_catalog()
    
    if args.summary or not args.query:
        print_summary(catalog)
        if not args.query:
            print("\nUsage example:")
            print("  python tools/fma_lookup.py aorta")
            print("  python tools/fma_lookup.py FMA3734")
            print("  python tools/fma_lookup.py femur --system 'Skeletal System'")
            return
            
    results = search_catalog(args.query, args.system)
    print(f"\nFound {len(results)} matching anatomical models for '{args.query}':\n")
    
    for i, item in enumerate(results[:args.limit]):
        print(f"[{i+1}] {item.get('english_name')}")
        print(f"    File: {item.get('file_name')} | File ID: {item.get('file_id')}")
        print(f"    Concept (FMA): {item.get('concept_id')} | Representation (BP): {item.get('representation_id')}")
        print(f"    System: {item.get('category')} | Volume: {item.get('volume_cm3'):.4f} cm³ | Size: {item.get('size_bytes') / 1024:.1f} KB")
        if item.get('bounds_min') and item.get('bounds_max'):
            print(f"    Bounds (mm): [{item.get('bounds_min')}] to [{item.get('bounds_max')}]")
        print()
        
    if len(results) > args.limit:
        print(f"... and {len(results) - args.limit} more results. Use --limit to display more.")

if __name__ == '__main__':
    main()
