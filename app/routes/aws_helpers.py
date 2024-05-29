import boto3
import botocore
import os
import uuid


# setting a list of allowable file types for upload
ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif", 'PNG'}
# get the name of the bucket from the environment variables
BUCKET_NAME = os.environ.get("S3_BUCKET")
# location at AWS where the bucket is located
S3_LOCATION = f"http://{BUCKET_NAME}.s3.amazonaws.com/"

# AWS upload functionality
s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("S3_KEY"),
   aws_secret_access_key=os.environ.get("S3_SECRET")
)


# helper function to create unoque file names for AWS
def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"


# function to upload a file to AWS bucket and return a public url
def upload_file_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in case the your s3 upload fails
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}


# function to remove files from AWS bucket
def remove_file_from_s3(image_url):
    # AWS needs the image file name, not the URL,
    # so you split that out of the URL
    key = image_url.rsplit("/", 1)[1]
    try:
        s3.delete_object(
        Bucket=BUCKET_NAME,
        Key=key
        )
    except Exception as e:
        return { "errors": str(e) }
    return True


#  (you can use the upload_file_to_s3 and remove_file_from_s3 together to handle update functionality too!)
