# JWT Authentication Example

This example is displays how jwt authentication might be implemented within a webpage. Once a user signs in, a cookie will be inserted into the clients browser and the user will be granted access. Currently, the cookie is active for one year.


### Instructions for execution:
- `example.env` must be renamed to `.env` as this file shall never be shared once in production.
- `APP_SECRET` within the `example.env` must be reassigned to a unique string for security purposes. Any string will do but it must be unique.
- Initialize the sql database using the included `schema.sql` file.
- Rename `username` property within the [config.json](./config/config.json) file.
- Populate the `password` property within the [config.json](./config/config.json) file.


### Technologies utilized within this example include:
- bcrypt
- cookieParser
- dotenv
- express
- jwt
- node
- sequelize