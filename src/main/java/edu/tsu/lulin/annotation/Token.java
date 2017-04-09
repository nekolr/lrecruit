package edu.tsu.lulin.annotation;

import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;
/**
 * 重复提交检查注解
 * @author excal
 *
 */
@Retention(RUNTIME)
@Target(METHOD)
public @interface Token {
	boolean save() default false;//save=true表示需要发送token
	boolean remove() default false;//remove=true表示需要删除session中的token
}
