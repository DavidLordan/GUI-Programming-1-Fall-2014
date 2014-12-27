<?php

# File: D:\H-Drive\91-461\461-2014-15f\assn09\MySolution\getFileCreationTime.php
# Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
# Copyright (c) 2014 by Jesse M. Heines. All rights reserved. May be freely
# copied or excerpted for educational purposes with credit to the author.
# updated by JMH on November 28, 2014 at 8:02 PM

# This program returns the file modification time (filemtime) of the file passed
# to it as the filepath parameter. It is called like this:
# http://{ServerPath}/getFileCreationTime.php?filepath={PathToFile}

// set the default timezone to use. Available since PHP 5.1.
// Now required before calling date function.
// http://php.net/manual/en/function.date.php
date_default_timezone_set('EST'); // -05:00

// format "c" returns the ISO 8601 date (added in PHP 5) in
// 2014-02-12T15:19:21+00:00 format
// this format is needed to construct a Data object properly in JavaScript
echo date( "c", filemtime( $_GET[ "filepath" ] ) ) ;
?>
