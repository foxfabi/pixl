<?php
/**
 * Build image crediting link from filename.
 *
 * @author  Fabian Dennler <fd@fabforge.ch>
 *
 * @param string $filename Unsplash filename.
 * @return string $credits Image crediting link.
 */
function imageCrediting($filename)
{
  $credits = str_replace('-unsplash.jpg', '', $filename);
  $credits = preg_replace('/[0-9]+/', '', $credits);
  $credits = trim(str_replace('-', ' ', $credits));
  $credits = ucwords($credits);
  $credits = sprintf('<i class="far fa-image"></i> <strong>%s</strong>', $credits);
  return $credits;
}

/**
 * Build the array of images (Only JPG) from folder.
 *
 * @author  Fabian Dennler <fd@fabforge.ch>
 *
 * @return array Shuffled images with crediting informations. 
 */
function loadImages()
{
  $images = array();
  $allowed_types = [ 'jpg' ];
  $handle = opendir(dirname(realpath(__FILE__)).'/images/');

  while($file = readdir($handle))
  {
    if($file !== '.' && $file !== '..')
    {
      $file_type = pathinfo($file, PATHINFO_EXTENSION);
      if (in_array($file_type, $allowed_types) == true)
      {
        $credits = imageCrediting($file);
        array_push($images, [
          'file' => $file,
          'credits' => $credits,
        ]);
      }
    }
  }
  shuffle($images);
  return $images;
}

#if( isset( $_SERVER['HTTP_X_REQUESTED_WITH'] ) && ( $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest' ) )
#{
  $images = loadImages();
  if (is_array($images)) {
    header('Content-Type: application/json');
    echo json_encode($images);
  }
#}
?>