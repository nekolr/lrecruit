package util;

import java.awt.image.BufferedImage;
import java.io.FileOutputStream;
import java.io.IOException;

import org.apache.log4j.Logger;
import org.junit.Test;

import edu.tsu.lulin.util.VerifyCode;

public class TestVerifyCode {
	private Logger logger = Logger.getLogger(TestVerifyCode.class);
	@Test
	public void testVerifyCode(){
		VerifyCode vc = new VerifyCode();
		//获取验证码图片
		BufferedImage image = vc.getImage();
		//获取图片上的文本
		logger.info(vc.getText());
		try {
			FileOutputStream fs = new FileOutputStream("verify.jpg");
			//把图片写到指定流中
			VerifyCode.output(image, fs);
			//在web项目中写到response.getOutputStream()中
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
