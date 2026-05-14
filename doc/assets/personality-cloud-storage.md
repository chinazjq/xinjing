# Personality Images Cloud Storage

人格结果图不放进小程序包内，避免触发主包体积限制。

## Source Assets

- MBTI: `doc/assets/mbti/images/{TYPE}.png`
- SBTI: `doc/assets/sbti/types/zh/*.png`

## Suggested Cloud Paths

- `personality/mbti/INTJ.png`
- `personality/mbti/INTP.png`
- `personality/sbti/ATM.png`
- `personality/sbti/BOSS.png`

上传到 CloudBase Storage 后，把返回的 `cloud://...` fileID 填入：

```text
code/data/personalityImages.js
```

结果页和分享海报会通过 `wx.cloud.getTempFileURL` 解析图片链接；未填写 fileID 时会自动隐藏图片区域，不影响测试流程。
