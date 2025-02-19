import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

type TSectionTitle = {
  title: string;
  description?: string;
}

const SectionTitle = ({ title, description }: TSectionTitle) => {
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.7,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: inView ? 1 : 0, 
        y: inView ? 0 : 20, 
      }}
      transition={{ duration: 0.8 }}
      className="flex justify-center items-center flex-col gap-3 mb-8"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center text-primary">
        {title}
      </h2>
      <p className="text-gray-800 font-normal text-center w-3/4 mx-auto">
        {description}
      </p>
    </motion.div>
  );
};

export default SectionTitle;
