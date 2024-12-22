/*
  # Add Create and Delete Profile Policies

  1. New Policies
    - Allow users to create their own profile
    - Allow users to delete their own profile

  2. Security Details
    - Users can only create a profile with their own auth.uid()
    - Users can only delete their own profile
    - Maintains data integrity by ensuring users can't create or delete other users' profiles
*/

-- Policy to allow users to create their own profile
CREATE POLICY "Users can create own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Policy to allow users to delete their own profile
CREATE POLICY "Users can delete own profile"
  ON profiles
  FOR DELETE
  TO authenticated
  USING (auth.uid() = id);