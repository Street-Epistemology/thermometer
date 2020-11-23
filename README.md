# Thermometer 🌡️
Bot for the Street Epistemology Discord live shows.

# Features

These features only work within the _🔴live-show-text_ channel.

To _use_ there commands below means to type them 

All commands are case-insensitive (can be either lower or uppercase) for the first letter. This was implemented to accommodate for many smartphones autocapitalising the first letter.

Note: Content between < > is just a placeholder.

## Public features

### `-` handles show claims and questions

Anyone on the server can write claims and questions to be shown on screen by preceeding them with a dash/minus (only work). Editing the message to add the dass/minus after posting does not currently work. Claims/questions that included a dash/minus on first post can be edited for spellcheck and rewording.

![Screenshot of claim/quetions handling and screen result](https://raw.githubusercontent.com/Street-Epistemology/thermometer/READMEimages/claimbot.jpg?raw=true)


This text is only shown uppon approval by someone with the _Live Show Host_ role by way of reacting via checkmark.\
The checkmark reaction (when used by the audience) only shows approval but has no other effect.\
The triangle-warning reaction is used to denote a need for spell-checking or rephrasing.\
The circular-ban reaction is used to mark the message as innapropriate for for use in SE.\
The floppy disk reaction is only for production team. Work in progress (goal, save messages to output as lista later)

## Production team features

The features below only work for memembers of the production team who have the 'Live Show Host' role.

### `howdy` just responds to show that Thermometer is awake and working.
It might also offer you a thermometer related joke.

### `host <text>` changes on-screen host name 

Changes the on-screen name of the host side. Using only `host` makes said text blank.

### `guest <text>` changes on-screen guest name 

Changes the on-screen name of the guest side. Using only `guest` makes said text blank.

### `unmute <@user>` removes the channel mute imposed by the _🔴Live Show_ channel permissions
Multiple user mentions supported. Example `unmute @user1 @user2 @user3`

Note: using `unmute` alone removes the channel mute from everyone. Use with caution.  

### `mute <@user>` reinsates the channel mute imposed by the _🔴Live Show_ channel permissions (if applicable)
Does not affect user that have roles with speak permission on this voice channel.

Multiple user mentions supported. Example `mute @user1 @user2 @user3`

Note: using `nmute` alone reinsates the channel mute from everyone. Use with caution.  


### `guest <@user>` enables user to speak and show video (make them our guest).

Unmutes and provides video permission via giving the _Live Show Guest_ role.

Revert individually with `unguest` or use `unclench` to remove role server-wide.

Multiple user mentions supported. Example `guest @user1 @user2 @user3`

### `unguest <@user>` removes the role given above and resets room permission for mentioned user(s).
Multiple user mentions supported. Example `unguest @user1 @user2 @user3`

### `unclench` Remove the role given above.
Removes the _Live Show Guest_ role server-wide.\
No user mention supported, use `unguest` for that.

## Advanced

### `camera <options*>` sends a link to the streamer and the remote user, to set up a peer-to-peer one-way video stream.
*Work in progress
### `room <options*>` sends a link to the streamer and the remote user, to set up a peer-to-peer two-way audio and video stream (four data streams).
*work in progress
### `showtime` sends the user a link for OBS remote control, to allow that user to control the stream (select Scenes, toggle Sources, ...) .
Only available if bot running from local streaming machine.

Thank you www.openode.io for generously hosting this project of ours!