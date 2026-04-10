# DCMP

## Bugs

- Issues with robots not re-entering queue when people leave the match scouting page
- Not pulling climb data from TBA properly

## Undesirable Behavior

- Pitscouting team list page should be numerical
    - Currently just storing them in the order drizzle does
- Have the on conflict do update clause work for submission

## Unimplemented Features

- Leaderboard backend (Azalea)
- Viewing of previously completed matches on admin dashboard
    - Simplied data
- Analysis Page

# CMP

## Match Assigning (Dillon's Idea)

- Each scout slot (red1, red2, etc) gets a neckband that a will be handed off when scouting shifts switch.
    - Each scout will only scout their designated slot during each shift.
    - This is more flexible than the schedule.

    - Scouts enter a match number, then select one of the six buttons (could cache)
    - Submission increments the key

- Has the problem where we're requiring scouts to enter the match number correctly

## Data Submission (QR Code)

- Have scouts sit in front of admin

## Data Processing

- In the meantime between matches, we could probably just run a database locally and excel sheet.
- Export to google sheets later when you have wifi like during lunch

