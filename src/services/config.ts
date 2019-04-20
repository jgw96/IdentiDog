export const config = {
  appId: "9b22bebd-a193-4e24-a277-07d5e7dcd6c5",
  authority: "https://login.microsoftonline.com/common",
  scopes: ["user.read", "UserActivity.ReadWrite.CreatedByApp"],
  redirectURI: `${location.origin}`
}