## Svelte Deno DOM Example

## Building

Make sure you have `denopack` installed and run the following command.
```sh
> cd example/
> deno run --config=../tsconfig.json --importmap=../import_map.json --allow-all --unstable ./build.ts Home.svelte
```

It should output

```sh
denopack completed in 14046ms
p:  { success: true, code: 0 }
```

Simple serve the example directory and navigate to localhost:9000 to see it in action.
```sh
> python -m SimpleHTTPServer
```

### For Server Side Rendered Code:

```sh
> cd example/
> deno run --config=../tsconfig.json --importmap=../import_map.json --allow-all --unstable ./buildssr.ts Home.svelte
```

## Windows Notes

Didn't work on Windows, so I had to use WSL

## Install Steps

1. Install unzip
```sh 
sudo apt-get install unzip -y 
```

2. Install deno
Check to see if denopack is already installed:

```sh
> deno -V 
```

```sh 
curl -fsSL https://deno.land/x/install/install.sh | sh 
```

Manually add the directory to your $HOME/.bash_profile (or similar)
  ```sh export DENO_INSTALL="/home/douga/.deno" ```
  ```sh export PATH="$DENO_INSTALL/bin:$PATH" ``` 

Run  ```sh /home/douga/.deno/bin/deno --help  ``` to get started

3. Install [denopack](https://github.com/denofn/denopack)

Check to see if denopack is already installed:
```sh denopack -v ```

if it isn't installed, install it like this:
```sh deno run --allow-run --allow-read https://deno.land/x/denopack@0.10.0/install.ts ```

Because I have python3 installed,

```python
python3 -m http.server
```