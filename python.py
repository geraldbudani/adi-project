import os

def iterate_through_files(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            print(file_path)

# specify the directory you want to iterate through
directory = 'fotot/valeria'
iterate_through_files(directory)