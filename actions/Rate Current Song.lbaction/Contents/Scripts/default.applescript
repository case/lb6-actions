on run
	return [{title:"No arguments passed"}]
end run

on handle_string(rating)
	set NewRating to ((rating as number) div 1)
	
	tell application "System Events"
		set iTunesisRunning to ((count of (every process whose name is "iTunes")) > 0)
	end tell
	
	set isTrackPlaying to false
	if iTunesisRunning then
		tell application "iTunes"
			if current track exists then set isTrackPlaying to true
		end tell
	end if
	
	if isTrackPlaying then
		tell application "iTunes"
			set CurrentRating to (rating of current track) / 20 as number
			set CurrentTrack to name of current track
			set CurrentAlbum to album of current track
			set CurrentArtist to artist of current track
			
			if (count of artwork of current track) > 0 then
				set Art to (data of artwork 1) of current track
			else
				set Art to "DEFAULT"
			end if
			
			set rating of current track to NewRating * 20
			set ScriptMode to "Rate"
		end tell
		
		(* Generate the star strings for the current and new ratings *)
		set CurrentStars to {}
		set NewStars to {}
		
		repeat with i from 1 to 5
			if i ≤ CurrentRating then
				set CurrentStars to CurrentStars & {"★"}
			else
				set CurrentStars to CurrentStars & {"☆"}
			end if
			if i ≤ NewRating then
				set NewStars to NewStars & {"★"}
			else
				set NewStars to NewStars & {"☆"}
			end if
		end repeat
		set CurrentStars to CurrentStars as string
		set NewStars to NewStars as string
		
		display notification CurrentStars & "  ➤  " & NewStars ¬
			with title ¬
			CurrentTrack subtitle CurrentAlbum & " – " & CurrentArtist
	else
		display notification "iTunes isn't playing a song." with title "Failed!"
	end if
end handle_string