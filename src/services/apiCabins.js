import supabase, { supabaseUrl, TABLE_PREFIX } from './supabase.js';

const table = TABLE_PREFIX + 'cabins';

export async function getCabins() {
  const { data, error } = await supabase.from(table).select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function createCabin(newCabin) {
  // Check if image is not null and image is a file, not a URL (in case of creation via duplication)
  const hasValidImageFile =
    newCabin.image && !newCabin.image.startsWith?.(supabaseUrl);

  // https://[PROJECT_ID].supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imageName =
    hasValidImageFile &&
    `${Math.random()}-${newCabin.image.name}`.replace('/', '');
  const imageFile = newCabin.image;
  newCabin.image = hasValidImageFile
    ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    : newCabin.image;

  // 1. Create cabin
  const { data, error: createError } = await supabase
    .from(table)
    .insert([newCabin])
    .select()
    .single();

  if (createError) {
    console.error(createError);
    throw new Error('Cabin could not be created');
  }

  if (!hasValidImageFile) {
    return data;
  }

  // 2. If successful, upload image
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, imageFile);

  // 3. Delete cabin if there was an image storageError
  if (storageError) {
    const { error: deleteError } = await supabase
      .from(table)
      .delete()
      .eq('id', data.id);

    if (deleteError) {
      console.error(deleteError);
      throw new Error(
        'Cabin image could not be uploaded, and created cabin could not be deleted'
      );
    }

    console.error(storageError);
    throw new Error(
      'Cabin image could not be uploaded, hence cabin was not created'
    );
  }

  return data;
}

export async function updateCabin(updatedCabin, id) {
  // https://[PROJECT_ID].supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const isNewImage =
    updatedCabin.image && !updatedCabin.image.startsWith?.(supabaseUrl);

  let imageName = null;
  let imageFile = null;
  if (isNewImage) {
    imageName = `${Math.random()}-${updatedCabin.image.name}`.replace('/', '');
    imageFile = updatedCabin.image;
    // If new image is provided, this property is updated here. Else, it remains as existing image's URL provided by form hook
    updatedCabin.image = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  const { data, error: updateError } = await supabase
    .from(table)
    .update(updatedCabin)
    .eq('id', id)
    .select()
    .single();

  if (updateError) {
    console.error(updateError);
    throw new Error('Cabin could not be updated');
  }

  if (isNewImage) {
    // 2. If successful, upload image
    const { error: storageError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, imageFile);

    if (storageError) {
      // 3. Report storageError
      console.error(storageError);
      throw new Error(
        'Cabin image could not be uploaded, current cabin image is invalid, please retry'
      );
    }
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from(table).delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }

  return data;
}
