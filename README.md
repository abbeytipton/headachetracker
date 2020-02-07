# README
# headachetracker

This web app is in progress. It is a tracker for headaches, in which users can log in, add a headache (by answering relevant questions about their activity before and during the headache) and then view graphs showing them their most common triggers.

Left to do:
- Add instructions to the graphs page (just need to style modal popup and add actual text)
- Make link for editing/deleting a log functional
- Make editing/deleting function work in the table of logs
- When creating a log, medicine checkmark isn't showing right
- When finishing a log, the save image isn't showing
- Testing, general organization
- Organize/comment/refactor code as needed
- Add instructions based on bool for first time user looks at graphs
- Add ability to remove triggers and add custom ones
- Mobile optimization

What's in progress?
- Currently working on adding customization to the logs

So far, I have:
- Added a new table to hold this information
- Created new controller/model/view for the new table
- Created method for adding a new customization
- Created route for this page
- Begun creating actual page with questions for user to answer (will mirror CSS of logging page)
- Added JS for questions added so far
- Finish questions/JS for questions

Left to do:
- Handle creation and make sure it's working
- Make page off limits if user has answered the questions already
- Make page off limits if user is not logged in
- Use information to determine what shows on logging page
- Use information to determine what shows on graphing page
