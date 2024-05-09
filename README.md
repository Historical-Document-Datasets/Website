# Historical Document Datasets

## 🚀 Running Locally

Follow these steps to get the website running on your local machine:

### ‼️ Prerequisites

Ensure you have `pnpm` installed on your system. If you do not have `pnpm` installed, you can install it globally using:

```bash
npm install -g pnpm
```

see https://pnpm.io/installation for more install options.

### ⚙️ Installation

First, clone the repository to your local machine using:

```bash
# clone the web site
git clone git@github.com:Historical-Document-Datasets/Website.git
# clone the catalogue
git clone git@github.com:Historical-Document-Datasets/Catalog.git
# move
cd Website
```

### 🏃‍♂️ Running the Development Server

To start the development server, run:

```bash
pnpm run dev
```

Open your web browser and navigate to the URL provided by the development server (check the terminal output, typically it's http://localhost:5173/).

## ✏️ Modify the catalog locally

Move to the catalog directory and follow these steps to set up and install dependencies using `requirements.txt`:

```bash
# Create a new virtual environment
python -m venv myenv

# Activate the virtual environment
# On Windows
myenv\Scripts\activate
# On macOS and Linux
source myenv/bin/activate
# Install dependencies from requirements.txt
pip install -r requirements.txt
```

Execute the Python script `generate_json.py` to convert the YAML file to JSON. You can do this by running the following command in your terminal:

```bash
python generate_json.py
```

## ⚠️ Important: Setup your environment variables

Create a `.env.local` file and add the following line:

```bash
VITE_CATALOG_URL="<LINK TO FILE>"
```

This is very important since it is needed for the website to work properly

Your catalog is now up-to-date and can be used by your local website.
