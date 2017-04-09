package edu.tsu.lulin.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.tsu.lulin.entity.Position;
import edu.tsu.lulin.service.PositionService;

@Controller("positionController")
@RequestMapping("/position")
public class PositionController {
	@Resource(name = "positionService")
	private PositionService positionService;

	@RequestMapping("/loadPosition")
	public @ResponseBody Object loadPosition(HttpServletRequest request, @RequestParam("tradeid") String tradeid) {
		List<Position> positionList = positionService.findPositionsByTradeid(Long.valueOf(tradeid));
		return positionList;
	}
	
	@RequestMapping("/findPositionById")
	public @ResponseBody Object findPositionById(@Param("positionid") Long positionid){
		Position position = positionService.findById(positionid);
		return position;
	}
}
