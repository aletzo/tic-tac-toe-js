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

    if (!is_file("js/$version/index.html")
        &&
        !is_file("js/$version/build/index.html")
        &&
        !is_file("js/$version/dist/ttt/index.html")
        &&
        !is_file("js/$version/public/index.html")
    ) {
        continue;
    }
    
    $versions[] = $version;
}

sort($versions);

if (!in_array($js, $versions)) {
    header('location: /vanillajs');
}

$file = "js/$js/index.html";

if (!is_file($file)) {
    $file = "js/$js/build/index.html";
}

if (!is_file($file)) {
    $file = "js/$js/dist/ttt/index.html";
}

if (!is_file($file)) {
    $file = "js/$js/public/index.html";
}

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

    <div id="content">
    <?php echo $content ?>
    </div>
</body>
</html>
