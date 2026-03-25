import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import { 
  ArrowRight, 
  ArrowUpRight,
  Target, 
  Users, 
  Code, 
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Globe,
  BarChart,
  Camera,
  BookOpen
} from 'lucide-react';
import Hero3DBackground from './components/Hero3DBackground';

// Reusable Parallax Image Component
const ParallaxImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Move image in opposite direction of scroll for parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  // Smooth out the parallax movement
  const smoothY = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div ref={ref} className={`overflow-hidden relative ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y: smoothY, scale: 1.2 }} // Scale up slightly to prevent edges showing during parallax
        className="absolute inset-0 w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

// Reusable Fade-In Section Component
const FadeInSection = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Global Scroll for Hero Parallax
  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 1000], [0, 300]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const blob1Y = useTransform(scrollY, [0, 1000], [0, 400]);
  const blob2Y = useTransform(scrollY, [0, 1000], [0, -300]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Variants for staggered lists
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as const } 
    }
  };

  return (
    <div className="min-h-screen font-sans text-zinc-400 bg-[#050505] selection:bg-primary selection:text-white overflow-x-hidden">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled ? 'bg-[#050505]/80 backdrop-blur-md border-white/10 py-4' : 'bg-transparent border-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center">
          <div className="text-xl font-bold text-white tracking-widest uppercase flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            INFINITY
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            {['核心业务', '出海孵化营', '服务体系', '关于我们', '资讯中心'].map((item) => (
              <a key={item} href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors tracking-wide relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <a href="#" className="text-sm text-white px-5 py-2.5 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300">
              获取专属方案
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-40 pb-20 lg:pt-56 lg:pb-32 px-6 relative h-screen min-h-[800px] flex items-center">
        {/* 3D Background */}
        <Hero3DBackground />
        
        {/* Abstract background elements with Parallax */}
        <motion.div style={{ y: blob1Y }} className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] opacity-30 pointer-events-none"></motion.div>
        <motion.div style={{ y: blob2Y }} className="absolute bottom-0 -left-1/4 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] opacity-20 pointer-events-none"></motion.div>
        
        <motion.div 
          style={{ y: heroTextY, opacity: heroOpacity }} 
          className="max-w-7xl mx-auto relative z-10 w-full"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="micro-label px-3 py-1 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">Google 全域营销</span>
            <span className="micro-label">B2B 出海增长引擎</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-[88px] font-light text-white tracking-tighter leading-[1.05] mb-8 max-w-5xl"
          >
            让外贸出海有 <br className="hidden md:block" />
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">无限可能</span>
          </motion.h1>

          <div className="grid md:grid-cols-2 gap-12 items-end mt-16">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg md:text-xl text-zinc-400 max-w-lg font-light leading-relaxed"
            >
              10+ 年 B2B 外贸经验 · 500+ 出海企业选择 · 从询盘到订单全链路降本提 ROI。
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 md:justify-end"
            >
              <a href="#" className="group bg-primary text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-primary-hover transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(0,83,213,0.4)] hover:-translate-y-1">
                免费获取方案 <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
              </a>
              <a href="#" className="group bg-transparent text-white px-8 py-4 rounded-full text-sm font-medium border border-white/20 hover:bg-white/5 transition-all duration-300 flex items-center justify-center hover:-translate-y-1">
                查看标杆案例
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      {/* Advantages - Bento Grid with Hover & Scroll Effects */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeInSection className="mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight mb-4">为什么选择 Infinity</h2>
            <p className="text-zinc-400 text-lg">专、精、实、久，做外贸企业真正的“行内人”服务商</p>
          </FadeInSection>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {[
              { icon: Target, num: '01', title: '聚焦 Google，拒绝泛渠道', desc: '不做全渠道烧钱，深耕 SEM/SEO/真实社媒账号，手把手触达海外决策者，让每一分成本落地 ROI。', span: 'lg:col-span-2' },
              { icon: Users, num: '02', title: '10+ 年行内人', desc: '核心团队均有外贸实战经验，不是纯技术方，而是您的“出海营销智囊团”。', span: '' },
              { icon: Code, num: '03', title: 'WP 定制为转化', desc: '拒绝模板站点，基于 WP 深度定制，兼顾 SEO 友好性，全链路围绕“询盘转化”设计。', span: '' },
              { icon: TrendingUp, num: '04', title: '全链路长期陪跑', desc: '不止单次服务，更有谷歌孵化营培训，从代运营到教运营，赋能团队实现长期增长。', span: 'lg:col-span-2' }
            ].map((adv, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className={`glass-panel p-8 lg:p-10 rounded-2xl group hover:bg-white/[0.05] transition-colors relative overflow-hidden ${adv.span}`}
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                <div className="flex justify-between items-start mb-12 relative z-10">
                  <adv.icon className="text-primary group-hover:scale-110 transition-transform duration-500" size={32} strokeWidth={1.5} />
                  <span className="font-mono text-zinc-600 text-sm">{adv.num}</span>
                </div>
                <h3 className="text-2xl font-medium text-white mb-4 relative z-10">{adv.title}</h3>
                <p className="text-zinc-400 leading-relaxed max-w-md relative z-10">{adv.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services - List Layout with Staggered Entry */}
      <section className="py-24 lg:py-32 px-6 bg-[#0a0a0a] border-y border-white/5 relative overflow-hidden">
        {/* Subtle background noise/gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-primary/5 blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <FadeInSection className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
            <div>
              <span className="micro-label block mb-4">Core Services</span>
              <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">六大核心业务</h2>
            </div>
            <p className="text-zinc-400 text-lg max-w-sm">围绕 Google 生态，打造外贸出海高转化闭环系统。</p>
          </FadeInSection>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col"
          >
            {[
              { icon: Globe, title: 'WordPress 定制独立站', desc: '以询盘为核心，打造品牌化高转化官网', features: ['深度定制 纯模板', '关键词 SEO 布局前置', '响应式设计 & 询盘功能全配'] },
              { icon: Target, title: 'Google 广告投放 (SEM)', desc: '精细化管控，实现广告投放正向 ROI', features: ['搜索 / 展示 / 视频全矩阵运营', 'AI 智能出价与精准受众', '严格购盘成本管控'] },
              { icon: BarChart, title: 'SEO 全域运营', desc: '长期主义，搭建独立站流量护城河', features: ['整站 SEO 策略与技术诊断', 'AI 智能出价与高质量内容创作', '高权重外链建设及站外推广'] },
              { icon: Camera, title: '品牌 VI 设计 & 拍摄', desc: '打造符合海外审美的高转化视觉', features: ['海外本土化 Logo / 画册设计', '工厂实景 / 产线 / 产品精拍', '高转化企业宣传片制作'] },
              { icon: BookOpen, title: '出海营销孵化营', desc: '从“代运营”到“教运营”的蜕变', features: ['一对一实战陪跑教学', '通盖 SEO/YouTube / 社媒运营', '全方位赋能自有外贸团队'] }
            ].map((service, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="group border-t border-white/10 py-10 md:py-12 flex flex-col lg:flex-row gap-8 lg:gap-16 hover:bg-white/[0.02] transition-colors px-4 -mx-4 rounded-xl cursor-pointer"
              >
                <div className="lg:w-1/3 flex flex-col justify-between">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-mono text-zinc-600 text-sm group-hover:text-primary transition-colors">0{i + 1}</span>
                    <h3 className="text-2xl font-medium text-white group-hover:translate-x-2 transition-transform duration-300">{service.title}</h3>
                  </div>
                  <p className="text-zinc-400">{service.desc}</p>
                </div>
                
                <div className="lg:w-1/2 flex flex-col justify-center">
                  <ul className="space-y-3">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3 text-zinc-300 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary/50 group-hover:bg-primary rounded-full mt-2 shrink-0 transition-colors"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:w-1/6 flex items-center lg:justify-end">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-300 group-hover:scale-110">
                    <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats & Cases with Image Parallax */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-12 mb-32 border-b border-white/10 pb-24"
          >
            {[
              { num: '10+', label: '年行业深耕' },
              { num: '500+', label: '服务出海企业' },
              { num: '150%', label: '询盘平均提升' },
              { num: '80+', label: '服务出口过亿企业' }
            ].map((stat, i) => (
              <motion.div key={i} variants={itemVariants} className="flex flex-col">
                <div className="text-5xl md:text-6xl font-light text-white mb-4 tracking-tighter">{stat.num}</div>
                <div className="micro-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <FadeInSection className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
            <div>
              <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight mb-4">标杆案例</h2>
              <p className="text-zinc-400 text-lg">500+ 出海企业的共同选择</p>
            </div>
            <a href="#" className="text-sm text-white px-6 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300">
              查看所有案例
            </a>
          </FadeInSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {[1, 2, 3].map((i) => (
              <React.Fragment key={i}>
                <FadeInSection delay={i * 0.1}>
                  <div className="group cursor-pointer">
                  <div className="rounded-xl aspect-[4/3] mb-6 bg-zinc-900 border border-white/5 relative overflow-hidden">
                    {/* Replaced standard img with ParallaxImage */}
                    <ParallaxImage 
                      src={`https://picsum.photos/seed/case${i}/800/600?grayscale`} 
                      alt="Case Study" 
                      className="w-full h-full opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-white text-xl font-medium mb-2 group-hover:text-primary transition-colors">XX 科技有限公司</h4>
                      <p className="text-zinc-500 text-sm">WP 建站 / Google 广告</p>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                      <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </FadeInSection>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Camp & Team - Split Layout with Parallax Images */}
      <section className="border-y border-white/10">
        <div className="grid lg:grid-cols-2">
          {/* Camp */}
          <div className="p-8 md:p-16 lg:p-24 border-b lg:border-b-0 lg:border-r border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500"></div>
            <FadeInSection className="relative z-10">
              <span className="micro-label block mb-8">Value Add</span>
              <h2 className="text-3xl md:text-4xl font-light text-white mb-6">出海营销孵化营</h2>
              <p className="text-zinc-400 mb-12 leading-relaxed max-w-md">
                从“代运营”到“教运营”，让您的自有外贸团队真正掌握 Google、Facebook 及各大社媒平台的核心获客能力。
              </p>
              <ul className="space-y-6 mb-12">
                {['实操型培训', '定制化课程', '一对一陪跑', '全面团队赋能'].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-zinc-300">
                    <span className="font-mono text-zinc-600 text-xs">0{i+1}</span>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="#" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors text-sm font-medium uppercase tracking-wider group/link">
                预约试听 <ArrowRight size={16} className="group-hover/link:translate-x-2 transition-transform" />
              </a>
            </FadeInSection>
          </div>

          {/* Team */}
          <div className="p-8 md:p-16 lg:p-24 relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/[0.02] group-hover:bg-white/[0.04] transition-colors duration-500"></div>
            <FadeInSection className="relative z-10">
              <span className="micro-label block mb-8">Our Team</span>
              <h2 className="text-3xl md:text-4xl font-light text-white mb-6">行动比承诺更有说服力</h2>
              <p className="text-zinc-400 mb-8 leading-relaxed max-w-md">
                在 Infinity，我们拒绝成为纯粹商业化、冷冰冰的营销机器。我们坚信“客户成功才是我们的成功”。
              </p>
              <div className="aspect-video rounded-xl overflow-hidden mb-8 border border-white/10 relative">
                 <ParallaxImage 
                    src="https://picsum.photos/seed/teamwork/800/450?grayscale" 
                    alt="Team" 
                    className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  />
              </div>
              <a href="#" className="inline-flex items-center gap-2 text-white hover:text-primary transition-colors text-sm font-medium uppercase tracking-wider group/link">
                了解我们 <ArrowRight size={16} className="group-hover/link:translate-x-2 transition-transform" />
              </a>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeInSection className="mb-16 md:mb-24">
            <span className="micro-label block mb-4">Workflow</span>
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">全链路解决方案</h2>
          </FadeInSection>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-5 gap-0 border border-white/10 rounded-2xl overflow-hidden"
          >
            {[
              { title: '前期诊断', desc: '免费企业出海现状诊断\n渠道潜力与竞品分析' },
              { title: '定制方案', desc: '结合产品与目标市场\n制定专属营销建站方案' },
              { title: '落地执行', desc: '策划+设计+技术+运营\n专属团队一对一实操落地' },
              { title: '数据优化', desc: '实时监控，持续调优\n降低获客成本，提升转化' },
              { title: '陪跑增长', desc: '孵化营培训+后期答疑\n实现从获客到增长跨越' }
            ].map((step, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className={`p-8 md:p-6 lg:p-8 border-b md:border-b-0 md:border-r border-white/10 last:border-0 bg-white/[0.01] hover:bg-white/[0.05] transition-colors group`}
              >
                <div className="font-mono text-primary text-xl mb-6 group-hover:-translate-y-2 transition-transform duration-300">0{i+1}</div>
                <h3 className="text-lg font-medium text-white mb-3">{step.title}</h3>
                <p className="text-zinc-500 text-sm whitespace-pre-line leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 lg:py-32 px-6 bg-[#0a0a0a] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <FadeInSection>
              <h2 className="text-4xl md:text-6xl font-light text-white mb-8 tracking-tighter">Ready to <br/>scale globally?</h2>
              <p className="text-zinc-400 mb-12 text-lg max-w-md">
                10+ 年全链路实操团队，一对一为您定制，从询盘到订单，全链路降本提 ROI。
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors"><Phone size={20} /></div>
                  <div>
                    <div className="micro-label mb-1">Call Us</div>
                    <div className="text-white text-lg group-hover:text-primary transition-colors">+86 186 8118 0175</div>
                  </div>
                </div>
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors"><Mail size={20} /></div>
                  <div>
                    <div className="micro-label mb-1">Email Us</div>
                    <div className="text-white text-lg group-hover:text-primary transition-colors">infinity@xxx.cn</div>
                  </div>
                </div>
              </div>
            </FadeInSection>
            
            <FadeInSection delay={0.2} className="glass-panel p-8 md:p-12 rounded-2xl">
              <h3 className="text-2xl font-medium text-white mb-8">获取专属方案</h3>
              <form className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="relative">
                    <input type="text" id="company" className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-primary transition-colors peer placeholder-transparent" placeholder="企业名称" required />
                    <label htmlFor="company" className="absolute left-0 -top-3.5 text-xs text-zinc-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-primary">企业名称 *</label>
                  </div>
                  <div className="relative">
                    <input type="text" id="name" className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-primary transition-colors peer placeholder-transparent" placeholder="联系人姓名" required />
                    <label htmlFor="name" className="absolute left-0 -top-3.5 text-xs text-zinc-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-primary">联系人姓名 *</label>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="relative">
                    <input type="tel" id="phone" className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-primary transition-colors peer placeholder-transparent" placeholder="联系电话" required />
                    <label htmlFor="phone" className="absolute left-0 -top-3.5 text-xs text-zinc-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-primary">联系电话 *</label>
                  </div>
                  <div className="relative">
                    <input type="text" id="industry" className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-primary transition-colors peer placeholder-transparent" placeholder="所属行业" required />
                    <label htmlFor="industry" className="absolute left-0 -top-3.5 text-xs text-zinc-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-zinc-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-primary">所属行业 *</label>
                  </div>
                </div>
                <button type="submit" className="w-full bg-white text-black py-4 rounded-full font-medium hover:bg-zinc-200 transition-colors mt-8 flex items-center justify-center gap-2 group">
                  提交申请 <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </form>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-20 pb-10 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="lg:col-span-1">
              <div className="text-xl font-bold text-white tracking-widest uppercase flex items-center gap-2 mb-6">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                INFINITY
              </div>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
                外贸出海 Google 全域营销专家，深耕 10+ 年，服务 500+ 出海企业。
              </p>
            </div>
            
            <div>
              <h4 className="micro-label mb-6">Services</h4>
              <ul className="space-y-4">
                {['SEM 广告投放', '定制独立站', 'SEO 全域运营', '品牌 VI 设计', '工厂 & 产品拍摄'].map(item => (
                  <li key={item}><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="micro-label mb-6">Company</h4>
              <ul className="space-y-4">
                {['首页', '出海孵化营', '服务体系', '关于我们', '资讯中心'].map(item => (
                  <li key={item}><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="micro-label mb-6">Connect</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">WeChat</a></li>
                <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">YouTube</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-zinc-600">© 2025 广州无限可能数字科技有限公司. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-zinc-600">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
