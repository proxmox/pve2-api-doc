#!/usr/bin/perl -w

use strict;
use PVE::RESTHandler;
use PVE::API2;
use JSON;

my $tree = PVE::RESTHandler::api_dump('PVE::API2');

print "var pveapi = " . to_json($tree, {pretty => 1}) . ";\n\n";

exit(0);
