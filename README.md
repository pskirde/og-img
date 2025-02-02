# og-img

og-img is a simple tool to create on the fly opengraph images for blogs or social media posts. It creates dynamic images based on the url.

For a real demo you can look at: [og-img.com](https://og-img.com)

## Setup

```bash
git clone git@github.com:pskirde/og-img.git
cd og-img
```

Make some changes to the Caddyfile and change the email to your own email adress and domain.


```bash
{
    # Email for Let's Encrypt notifications
    email example@example.com
}

# Replace example.com with your domain
example.com {
    ....
```

Change example@example.com and example.com accordingly.

```bash
docker compose up -d
```
## Usage

You simply change the URL to whatever opengraph image you want to generate. The following url will generate the image with the text "Preview Text".

```bash
https://og-img.com/Preview%20Text/og.png
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)