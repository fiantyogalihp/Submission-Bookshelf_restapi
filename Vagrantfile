# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/focal64"

  config.vm.provider "virtualbox" do |vb|
    vb.memory = 512
    vb.cpus = 1
    vb.linked_clone = true
  end
  config.vm.define "nginx" do |app|
    app.vm.hostname = "nginx.vagrant.local"
    app.vm.network :private_network, ip: "10.0.1.2"
  end

  config.vm.network "forwarded_port", guest: 80, host: 6666, auto_correct: true
  config.vm.provision "shell", inline: <<-SHELL
    apt-get update
    apt-get install -y nodejs npm nginx
    npm i -g pm2
  SHELL
end
