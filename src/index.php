<?php

date_default_timezone_set('Europe/Kiev');
$config = array();
$date = new DateTime();
$config['currentTime'] = $date->getTimestamp();
$date = new DateTime('2015-11-17 22:00:00');
$config['endTime'] = $date->getTimestamp();
$config['leftTime'] = $config['endTime'] - $config['currentTime'];

include_once 'tpl/timer.php';