#!/bin/bash
# Package checking, Download and Install Multipass package
pkg=`which multipass`
if [ "$pkg" == "" ]; then
    echo "Installing multipass, this will take a few secs ..."
    # curl -L -C - https://github.com/canonical/multipass/releases/download/v1.8.1/multipass-1.8.1+mac-Darwin.pkg --output /tmp/multipass-1.8.1+mac-Darwin.pkg
    sleep 5
    sudo installer -pkg $1 -target /Applications
else
    echo "Skipping download, Multipass is already installed"
fi
# Wait for multipass initialization
while [ ! -S /var/run/multipass_socket ];
do
    sleep 1
done
echo "ca7747dfcae5ee948ffee4c81099b1a4"
echo "Creating a lightweight Ubuntu VM, this will take a few mins ..."
# Create a virtual system(VM)
multipass launch --name deck-app -c 4 -d 10G -m 4G
multipass umount deck-app
#Create directory
# mkdir -p $HOME/deck-projects
# multipass mount $HOME/deck-projects deck-app:/deck-projects
# Set primary system(VM)
multipass set client.primary-name=deck-app
multipass set client.gui.autostart=false
# Install docker in multipass virtual system(VM)
echo "30cc5285d6bc297b9ca633042957def0"
multipass exec deck-app -- bash -c "mkdir -p /home/ubuntu/`whoami` && sudo touch /etc/auto.projects && 
                                    sudo chown `multipass exec deck-app whoami`:`multipass exec deck-app whoami` /etc/auto.projects && 
                                    echo /home/ubuntu/`whoami` -fstype=nfs,rw,nolock,nosuid,proto=tcp,resvport `ifconfig -l | xargs -n1 ipconfig getifaddr`:/Users/`whoami` | tee /etc/auto.projects
                                    curl https://raw.githubusercontent.com/deck-app/multipass-install/master/multipass-install.sh | sh"
