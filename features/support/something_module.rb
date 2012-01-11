module SomethingModule
   def path_to(page_name)
      page = ''
      if page_name == 'home'
         page = ''
      elsif page_name == 'stories'
         page = 'stories'
      end
      "/#{page}"
   end
end
