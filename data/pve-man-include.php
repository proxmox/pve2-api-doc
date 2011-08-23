<?php

# see http://www.mediawiki.org/wiki/Manual:Parser_functions

$wgExtensionCredits['parserhook'][] = array(
        'name' => "PVE Manual Pages",
        'description' => "Display PVE manual pages", 
        'author' => "Dietmar Maurer",
);
 
# Define a setup function
$wgHooks['ParserFirstCallInit'][] = 'efPvemanParserFunction_Setup';
# Add a hook to initialise the magic word
$wgHooks['LanguageGetMagic'][]       = 'efPvemanParserFunction_Magic';
 
function efPvemanParserFunction_Setup( &$parser ) {
        # Set a function hook associating the "pveman" magic word with our function
 $parser->setFunctionHook( 'pveman', 'efPvemanParserFunction_Render' );
        return true;
}
 
function efPvemanParserFunction_Magic( &$magicWords, $langCode ) {
        # Add the magic word
        # The first array element is whether to be case sensitive, in this case (0) it is not case sensitive, 1 would be sensitive
        # All remaining elements are synonyms for our parser function
        $magicWords['pveman'] = array( 0, 'pveman' );
        # unless we return true, other parser functions extensions won't get loaded.
        return true;
}
 
function efPvemanParserFunction_Render( $parser, $param1 = '', $param2 = '' ) {
        # The parser function itself
        # The input parameters are wikitext with templates expanded
        # The output should be wikitext too

	$parser->disableCache();

	$allowed = array(
		'pvecm.1.html' => 1, 
		'qm.1.html' => 1, 
		'datacenter.cfg.5.html' => 1,
		'vm.conf.5.html' => 1,
		);

	if (!$allowed[$param1]) {
		die ("no such manual page");
	}

	$output = file_get_contents("/usr/share/pve2-api-doc/man/$param1");

	$output = preg_replace('|^.*(<h1><a name="name">NAME</a></h1>)|s', '\1', $output);
	$output = preg_replace('|</body>.*$|s', '', $output);
	$output = preg_replace('|<p>\s*\n\s*</p>\n?|m', '', $output);
	$output = preg_replace('|<hr\s*/>\n?|', '', $output);
	$output = preg_replace('|^\n|m', '', $output);

	return array( $output, 'noparse' => true, 'isHTML' => true );
}

?>
