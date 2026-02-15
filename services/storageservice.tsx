import { supabase } from "@/lib/supabase";

export async function uploadAvatar(
  userId: string,
  imageUri: string
) {

  try {

    const response = await fetch(imageUri);

    const arrayBuffer = await response.arrayBuffer();

    const filePath = `${userId}/avatar.jpg`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, arrayBuffer, {
        contentType: "image/jpeg",
        upsert: true,
      });

    if (error) {
      console.log("Upload error:", error.message);
      throw error;
    }

    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    return data.publicUrl;

  } catch (error) {
    console.log("Upload failed:", error);
    throw error;
  }

}




