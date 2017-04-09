package edu.tsu.lulin.controller;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.tsu.lulin.entity.Trade;
import edu.tsu.lulin.service.TradeService;

@Controller("tradeController")
@RequestMapping("/trade")
public class TradeController {
	@Resource
	private TradeService tradeService;

	@RequestMapping("/loadFirstTrade")
	public @ResponseBody Object loadFirstTrade() {
		List<Trade> tradeList = tradeService.findByParentid(0l);
		return tradeList;
	}

	@RequestMapping("/loadSecondTrade")
	public @ResponseBody Object loadSecondTrade(@RequestParam("parentid") String parentid) {
		List<Trade> tradeList = tradeService.findByParentidAndNull(Long.valueOf(parentid));
		return tradeList;
	}
	
	@RequestMapping("/loadSecondTradeISPN")
	public @ResponseBody Object loadSecondTradeISPN(@RequestParam("parentid") String parentid) {
		List<Trade> tradeList = tradeService.findByParentidAndISPN(Long.valueOf(parentid));
		return tradeList;
	}

	@RequestMapping("/loadFirstTradeExist")
	public @ResponseBody Object findExistRefPosition() {
		List<Trade> tradeList = tradeService.findExistRefPosition();
		return tradeList;
	}
	
}
