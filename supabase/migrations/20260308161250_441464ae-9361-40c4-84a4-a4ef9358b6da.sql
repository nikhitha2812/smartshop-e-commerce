
-- Function to make a user admin (only callable by existing admins or if no admins exist yet)
CREATE OR REPLACE FUNCTION public.make_admin(_email TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _user_id UUID;
  _admin_count INTEGER;
BEGIN
  -- Check if caller is admin or if no admins exist
  SELECT COUNT(*) INTO _admin_count FROM public.user_roles WHERE role = 'admin';
  
  IF _admin_count > 0 AND NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Only admins can create other admins';
  END IF;
  
  -- Find user by email
  SELECT id INTO _user_id FROM auth.users WHERE email = _email;
  
  IF _user_id IS NULL THEN
    RAISE EXCEPTION 'User not found';
  END IF;
  
  -- Insert admin role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (_user_id, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
END;
$$;
