set :application, "GreasemonkeyTests"
set :repository,  "svn+ssh://gandrew.com/home/1439/users/.home/repos/GreasemonkeyTests/trunk"
set :deploy_to, "/home/1439/domains/gandrew.com/html/projects/#{application}"
set :user, 'serveradmin@gandrew.com'

set :checkout, "export"

role :app, "gandrew.com"
role :web, "gandrew.com"
role :db,  "gandrew.com", :primary => true

desc "This will deploy the app"
namespace :ga do
  task :deploy do
    run "svn --quiet #{checkout} #{repository} #{release_path}"
    run "ln -nfs #{release_path} #{current_path}"
  end
end
