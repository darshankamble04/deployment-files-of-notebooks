// import dotenv from 'dotenv'
const aws = require ('aws-sdk')
const crypto = require ('crypto')
const { promisify } = require ("util")
const randomBytes = promisify(crypto.randomBytes)

// dotenv.config()

const region = "us-west-2"
const bucketName = "notebook-covers"
// const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const accessKeyId = "AKIAQI56HWKYLWOBJVBD"
const secretAccessKey = "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"

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

 async function generateUploadURL() {
  const rawBytes = await randomBytes(16)
  const imageName = rawBytes.toString('hex')

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  })
  
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  return uploadURL
}

module.exports = {generateUploadURL}
// export default generateUploadURL