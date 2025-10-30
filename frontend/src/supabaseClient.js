
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zdsjncgyuannvylptgbv.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpkc2puY2d5dWFubnZ5bHB0Z2J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2NDYxNTQsImV4cCI6MjA3MzIyMjE1NH0.amsS7VBNGfNfKIfenivW38iVPW6u5JWYesmAJVimhyM";

export const supabase = createClient(supabaseUrl, supabaseKey);
