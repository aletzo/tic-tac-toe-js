<?php

if (empty($_SERVER['PATH_INFO'])) {
    header('location: /vanillajs');
}

$js = trim($_SERVER['PATH_INFO'], '/');

$dirs = new DirectoryIterator('js');

$versions = [];

foreach ($dirs as $fileinfo) {
    if ($fileinfo->isDot()) {
        continue;
    }

    if (!$fileinfo->isDir()) {
        continue;
    }

    $version = $fileinfo->getFilename();

    if (!is_file("js/$version/index.html")) {
        continue;
    }
    
    $versions[] = $version;
}

sort($versions);

if (!in_array($js, $versions)) {
    header('location: /vanillajs');
}

$file = "js/$js/index.html";

$content = file_get_contents($file);

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>

    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <h1>tic tac toe - <?php echo $js ?></h1>

    <?php if (count($versions) > 1) : ?>
    <div id="versions">
        <?php foreach ($versions as $version) : ?>
        <a 
            class="<?php echo $version === $js ? 'active' : '' ?>"
            href="/<?php echo $version ?>"
        >
            <?php echo $version ?>
        </a>
        <?php endforeach ?>
    </div>
    <?php endif ?>

    <?php echo $content ?>
</body>
</html>
