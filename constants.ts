
import { Service, Technology, TeamMember, Testimonial, Location, ServiceCategory } from './types';
import anaCorderoImage from './Doctores/Ana Cordero.jpeg';
import winiferDominguezImage from './Doctores/DraWiniferDomínguez.jpeg';
import manuelaPichardoImage from './Doctores/Dra. Manuela Pichardo.jpg';
import annyCabrejaImage from './Doctores/Dra. Anny Cabreja.jpeg';

const localServiceImageModules = import.meta.glob('./Fotos de servicios/*.{png,jpg,jpeg,avif,webp,PNG,JPG,JPEG}', {
    eager: true,
    import: 'default',
}) as Record<string, string>;

const normalizeFileName = (value: string): string =>
    value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\.[^.]+$/, '')
        .replace(/[^a-z0-9]/g, '');

const localServiceImagesByName = Object.fromEntries(
    Object.entries(localServiceImageModules).map(([path, imageUrl]) => {
        const fileName = path.split('/').pop() || '';
        return [normalizeFileName(fileName), imageUrl];
    })
);

const resolveLocalImage = (imageUrl: string): string => {
    const fileName = decodeURIComponent(imageUrl.split('/').pop() || '');
    const directKey = normalizeFileName(fileName);

    if (localServiceImagesByName[directKey]) {
        return localServiceImagesByName[directKey];
    }

    const match = Object.entries(localServiceImagesByName).find(([key]) => key.includes(directKey) || directKey.includes(key));
    return match ? match[1] : imageUrl;
};

const FULL_SERVICE_DESCRIPTIONS: Record<string, string> = {
    'Aumento de Labios': `Aumento de Labios con Ácido Hialurónico
Realza tu Belleza Natural
En Be Aesthetic República Dominicana, entendemos que cada sonrisa es única. Nuestro tratamiento de aumento de labios con ácido hialurónico está diseñado para realzar tu belleza natural, proporcionando volumen y definición a tus labios de manera segura y efectiva.
¿Qué es el Aumento de Labios?
El aumento de labios es un procedimiento estético que utiliza ácido hialurónico, una sustancia que se encuentra de forma natural en el cuerpo, para incrementar el volumen y mejorar la forma de los labios. Este tratamiento es ideal para quienes desean unos labios más llenos y definidos, sin perder su naturalidad.
Beneficios del Tratamiento
Aspecto Natural: El ácido hialurónico se adapta perfectamente a tus labios, creando un resultado que se ve y se siente natural.
Personalización: Nuestros especialistas evalúan tus labios y te ayudarán a elegir la forma y el volumen que mejor se adapte a tu estilo y preferencias.
Procedimiento Seguro: Utilizamos productos aprobados y de alta calidad, asegurando un tratamiento seguro y efectivo.
Resultados Inmediatos: Verás resultados instantáneos después de la sesión, con una mejora continua en los días siguientes.
Proceso del Tratamiento
Consulta Personalizada: En tu primera cita, un especialista de Be Aesthetic te realizará una evaluación exhaustiva. Hablaremos sobre tus expectativas y te explicaremos el procedimiento.
Tratamiento Efectivo: El procedimiento, que dura entre 30 y 60 minutos, se realiza en un ambiente cómodo y relajante. Aplicamos anestesia local para que te sientas a gusto durante el tratamiento.
Resultados Rápidos: Tras el tratamiento, podrás ver cambios inmediatos. Aunque es normal experimentar algo de hinchazón, la mayoría de los efectos secundarios desaparecerán en pocos días.
Cuidados Posteriores
Para garantizar una recuperación óptima, te recomendamos:
Evitar actividades físicas intensas durante al menos 24 horas.
No exponerte a fuentes de calor extremo, como saunas o sol, durante una semana.
No masajear tus labios en las primeras 48 horas.
Seguir las indicaciones de nuestros especialistas para un cuidado adecuado.
Duración de los Resultados
Los resultados del aumento de labios con ácido hialurónico suelen durar entre 12 y 18 meses. Te invitamos a programar retoques periódicos para mantener tus labios en su mejor forma.
"El aumento de labios en Be Aesthetic ha sido una experiencia transformadora. Los resultados son simplemente increíbles y el equipo fue excepcional." - Lucía T.`,
    'Relleno de Ojeras': `Relleno de Ojeras
Renueva tu Mirada
En Be Aesthetic República Dominicana, entendemos que la apariencia de tus ojos puede afectar tu bienestar emocional y tu confianza. Nuestro tratamiento de relleno de ojeras está diseñado para rejuvenecer tu mirada, eliminando el aspecto cansado y fatigado que puede ser causado por ojeras marcadas.
¿Qué es el Relleno de Ojeras?
El relleno de ojeras es un procedimiento estético que utiliza ácido hialurónico para tratar las bolsas y la hendidura en el área bajo los ojos. Este tratamiento ayuda a restaurar el volumen perdido y suavizar las sombras, proporcionando un aspecto fresco y revitalizado.
Beneficios del Tratamiento
Resultados Naturales: El ácido hialurónico se integra de forma armónica con la piel, ofreciendo un resultado que se ve y se siente natural.
Efecto Inmediato: Los resultados son visibles de inmediato, lo que significa que podrás disfrutar de una mirada renovada tras tu primera sesión.
Mínimamente Invasivo: El procedimiento es rápido y cómodo, con poco tiempo de recuperación, permitiéndote volver a tus actividades diarias en poco tiempo.
Personalización: Nuestros especialistas evalúan tus necesidades específicas para crear un tratamiento adaptado a ti.
Proceso del Tratamiento
Consulta Personalizada: Durante tu primera cita, nuestros expertos evaluarán tus ojeras y discutirán tus expectativas. Te proporcionaremos toda la información necesaria sobre el procedimiento.
Aplicación del Relleno: El tratamiento, que dura aproximadamente 30-45 minutos, se realiza en un entorno cómodo. Usamos anestesia local para asegurar que te sientas a gusto durante el procedimiento.
Resultados Rápidos: Después del tratamiento, notarás una mejora instantánea en el aspecto de tus ojos. Es normal experimentar algo de hinchazón, que desaparecerá en pocos días.
Cuidados Posteriores
Para maximizar los resultados y garantizar una recuperación adecuada, te sugerimos:
Evitar la exposición al sol y usar protector solar en el área tratada.
No realizar ejercicios intensos durante las primeras 24 horas.
Evitar el consumo de alcohol y alimentos muy salados para reducir la hinchazón.
Duración de los Resultados
Los resultados del relleno de ojeras pueden durar entre 12 y 18 meses, dependiendo de factores individuales como el tipo de piel y el estilo de vida. Recomendamos sesiones de seguimiento para mantener el efecto deseado.`,
    'Relleno de Surcos Nasogenianos': `Relleno de Surcos Nasogenianos
Devuélvele la Juventud a Tu Rostro
En Be Aesthetic República Dominicana, sabemos que el paso del tiempo puede dejar huellas en nuestra piel, especialmente en forma de surcos y líneas de expresión. Nuestro tratamiento de relleno de surcos está diseñado para restaurar el volumen perdido y suavizar esas líneas, devolviéndo a tu rostro un aspecto más juvenil y fresco.
¿Qué son los Surcos?
Los surcos faciales son pliegues o líneas que se forman en la piel, a menudo alrededor de la nariz, la boca y los ojos. Con la edad, la piel pierde colágeno y elasticidad, lo que puede acentuar estos surcos y dar un aspecto de cansancio o envejecimiento.
¿Qué es el Relleno de Surcos?
El relleno de surcos utiliza ácido hialurónico, una sustancia que se encuentra naturalmente en el cuerpo, para rellenar y suavizar estas líneas. Este tratamiento no solo mejora la apariencia de los surcos, sino que también aporta hidratación y elasticidad a la piel.
Beneficios del Tratamiento
Resultados Naturales: El ácido hialurónico se adapta a la estructura de tu piel, logrando un aspecto armónico y natural.
Efecto Inmediato: Los resultados son visibles de inmediato, permitiéndote disfrutar de un rostro renovado tras la primera sesión.
Mínima Invasividad: El procedimiento es rápido y generalmente se realiza con anestesia local, lo que minimiza cualquier incomodidad.
Personalización: Nuestros especialistas diseñan un plan de tratamiento específico para ti, adaptando la cantidad y la técnica según tus necesidades.
Proceso del Tratamiento
Consulta Inicial: En tu primera visita, evaluaremos tus surcos y discutiremos tus expectativas. Te proporcionaremos información detallada sobre el procedimiento y resolveremos todas tus dudas.
Aplicación del Relleno: El tratamiento, que dura entre 30 y 60 minutos, se lleva a cabo en un ambiente cómodo. Utilizamos anestesia local para garantizar tu bienestar durante el procedimiento.
Resultados Rápidos: Tras la aplicación, verás mejoras inmediatas en la apariencia de tus surcos. Puede haber una ligera hinchazón, pero esta suele desaparecer en pocos días.
Cuidados Posteriores
Para optimizar los resultados y garantizar una recuperación adecuada, te recomendamos:
Evitar la exposición directa al sol y aplicar protector solar en el área tratada.
No realizar ejercicios intensos durante 24 horas después del tratamiento.
Evitar el consumo de alcohol y alimentos muy salados para reducir la hinchazón.
Duración de los Resultados
Los efectos del relleno de surcos pueden durar entre 12 y 18 meses, dependiendo de factores individuales como el tipo de piel y el estilo de vida. Sugerimos programar revisiones para mantener los resultados deseados.`,
    'Reposicionamiento Malar': `Reposicionamiento malar o Puntos de anclaje

El reposicionamiento malar, también conocido como puntos de anclaje, es una técnica avanzada de armonización facial diseñada para restaurar el soporte natural del rostro, mejorar el contorno facial y lograr un efecto de lifting sutil y natural, sin necesidad de cirugía.
Con el paso del tiempo, el rostro pierde volumen y firmeza en la zona media, lo que provoca descolgamiento, pérdida de proyección y cambios en la expresión facial. A través del reposicionamiento malar, se colocan estratégicamente rellenos dérmicos en puntos clave de soporte, permitiendo elevar, sostener y redefinir las estructuras faciales respetando la anatomía y proporciones naturales de cada paciente.
En Be Aesthetic R.D., este procedimiento se realiza de forma personalizada y segura, utilizando productos de alta calidad y técnicas médicas precisas, con el objetivo de rejuvenecer el rostro sin alterar la identidad facial.
Beneficios del reposicionamiento malar:
Recupera el soporte y la estructura facial
Mejora el contorno del tercio medio del rostro
Atenúa surcos y signos de flacidez
Aporta un efecto lifting natural
Resultados inmediatos y progresivos
Procedimiento mínimamente invasivo

El reposicionamiento malar es ideal para quienes buscan armonizar el rostro, prevenir el envejecimiento facial o potenciar otros tratamientos como la armonización de labios, la rinomodelación o los bioestimuladores de colágeno.
Duración de los Resultados
Los resultados del aumento de pómulos con rellenos dérmicos pueden durar entre 10 y 12 meses, dependiendo de factores individuales. Sugerimos sesiones de mantenimiento para conservar el efecto deseado.`,
    'Toxina Botulínica': `Toxina Botulínica

Rejuvenecimiento y Prevención de Arrugas

La toxina botulínica, comúnmente conocida como Botox, es uno de los tratamientos estéticos más populares para combatir las arrugas y líneas de expresión. Este procedimiento mínimamente invasivo relaja temporalmente los músculos faciales, suavizando arrugas existentes y previniendo la formación de nuevas líneas.

Beneficios de la Toxina Botulínica:

Suaviza arrugas y líneas de expresión: Ideal para tratar arrugas en la frente, patas de gallo y entrecejo.
Prevención de nuevas arrugas: Al relajar los músculos, se reduce la posibilidad de que se formen nuevas líneas de expresión.
Procedimiento rápido y eficaz: La aplicación es sencilla y toma solo unos minutos.
Resultados naturales: Mantiene la expresión facial sin la apariencia de un rostro congelado.
Efecto temporal y reversible: Los resultados duran entre 3 y 6 meses, permitiendo ajustes periódicos según las necesidades.

¿Cómo funciona el tratamiento?

La toxina botulínica actúa bloqueando la señal entre los nervios y los músculos, lo que impide la contracción muscular en las zonas tratadas. Esto permite que las arrugas se relajen y se suavicen, aportando un aspecto más juvenil y fresco. Es un procedimiento seguro, siempre que sea administrado por profesionales capacitados.

¿Cuándo es recomendable?

El uso de la toxina botulínica está indicado para personas que desean:
Corregir líneas de expresión moderadas a severas.
Prevenir la aparición de nuevas arrugas.
Mantener un aspecto rejuvenecido sin necesidad de cirugías invasivas.

Tratamiento complementario:

La toxina botulínica puede combinarse con otros procedimientos estéticos, como el uso de ácido hialurónico o hilos tensores PDO, para maximizar los resultados y personalizar el rejuvenecimiento facial.`,
    'Rinomodelación con Hilos Tensores + Ácido Hialurónico': `Rinomodelación con Ácido Hialurónico

Redefine Tu Perfil Facial

En Be Aesthetic República Dominicana, entendemos que la nariz juega un papel fundamental en la armonía de tu rostro. La rinomodelación con ácido hialurónico es un procedimiento no quirúrgico que te permite mejorar la forma y el contorno de tu nariz de manera segura y efectiva, sin necesidad de cirugía.

¿Qué es la Rinomodelación?

La rinomodelación es un tratamiento estético que utiliza ácido hialurónico para corregir imperfecciones en la nariz, como dorsos hundidos, asimetrías o puntas caídas. Este procedimiento ofrece resultados inmediatos y es ideal para quienes desean una mejora en su apariencia nasal sin pasar por el quirófano.

Beneficios del Tratamiento

Resultados inmediatos: La rinomodelación proporciona cambios visibles al instante.
Procedimiento no invasivo: Es rápido, cómodo y requiere poco tiempo de recuperación.
Personalización: El plan se adapta a tus necesidades y objetivos estéticos.
Reversibilidad: El ácido hialurónico puede disolverse en caso de requerir ajustes.

Proceso del Tratamiento

Consulta inicial: Evaluación completa y planificación personalizada.
Aplicación del relleno: Procedimiento de 30 a 45 minutos con anestesia local.
Resultados rápidos: Mejora inmediata de la forma y perfil nasal.

Cuidados Posteriores

Evitar exposición solar directa y utilizar protector solar.
No realizar actividades físicas intensas durante las primeras 24 horas.
Evitar masajes en la nariz durante al menos dos semanas.

Duración de los Resultados

Los resultados suelen durar entre 12 y 18 meses, dependiendo del metabolismo, hábitos y características de cada paciente.`,
    'Marcación Mandibular y Proyección Mentón': `Marcación mandibular y proyección mentón

La marcación mandibular y la proyección de mentón con ácido hialurónico son procedimientos de armonización facial diseñados para definir, equilibrar y fortalecer el contorno del rostro, aportando estructura, simetría y una apariencia más armónica y rejuvenecida.

Mediante la aplicación estratégica de ácido hialurónico de alta densidad, se logra resaltar la línea mandibular, mejorar el perfil facial y proyectar el mentón de forma natural, respetando siempre las proporciones y la anatomía de cada paciente. Este tratamiento permite crear un efecto definido y elegante sin perder naturalidad ni expresión.

En Be Aesthetic R.D., este procedimiento se realiza de manera personalizada, segura y precisa, utilizando productos de alta calidad y técnicas médicas avanzadas, con resultados visibles desde el primer momento.

Beneficios del tratamiento:

Define y perfila la línea mandibular.
Mejora el perfil facial.
Aporta mayor proyección y equilibrio al mentón.
Favorece la simetría facial.
Resultados inmediatos y naturales.
Procedimiento mínimamente invasivo.

Duración de los resultados:

Los resultados tienen una duración aproximada de 12 a 18 meses, dependiendo del metabolismo del paciente, el tipo de producto utilizado y los hábitos individuales.`,
    'Hydrafacial': `Hydrafacial:

Limpieza, Hidratación y Rejuvenecimiento en un Solo Tratamiento

El Hydrafacial es un innovador tratamiento facial no invasivo que combina limpieza profunda, exfoliación, extracción de impurezas e hidratación intensiva en un solo procedimiento. Este método es ideal para todo tipo de pieles y proporciona resultados inmediatos, dejando la piel radiante, fresca y rejuvenecida.

¿Cómo funciona el tratamiento Hydrafacial?

Realiza un proceso de limpieza en tres pasos clave: exfoliación, extracción y fusión. Mediante la aplicación de sueros nutritivos y la extracción de impurezas de los poros, el tratamiento hidrata profundamente la piel, eliminando células muertas y dejando una tez luminosa y revitalizada.

Beneficios del Hydrafacial:

Limpieza profunda: Elimina impurezas, puntos negros y células muertas.
Exfoliación suave: Deja la piel más suave y lisa sin irritación.
Hidratación intensiva: Aporta a la piel ingredientes nutritivos como ácido hialurónico, antioxidantes y péptidos.
Tratamiento personalizable: Se adapta a las necesidades específicas de cada tipo de piel, como la piel grasa, seca, sensible o con signos de envejecimiento.
Resultados inmediatos y duraderos: Mejora la textura, el tono y la hidratación de la piel, proporcionando un brillo saludable desde la primera sesión.

¿Para quién está indicado?

Hydrafacial es adecuado para todo tipo de pieles, incluidas las pieles sensibles. Es una excelente opción para personas que buscan un tratamiento no invasivo que combina limpieza profunda y rejuvenecimiento, ideal para mejorar la apariencia de poros dilatados, líneas finas, manchas, y piel grasa o con acné.

Proceso y duración del tratamiento:

El procedimiento dura aproximadamente 30-45 minutos y no requiere tiempo de recuperación, por lo que puedes retomar tus actividades diarias de inmediato. Los resultados son visibles de inmediato, con una piel más suave, fresca e hidratada. Para mantener los efectos a largo plazo, se recomienda realizar tratamientos mensuales.`,
    'Facial Profundo': `Limpieza Facial Profunda:

Renovación y Purificación de la Piel

La limpieza facial profunda es un tratamiento esencial para eliminar las impurezas acumuladas en la piel, dejando el rostro fresco, limpio y renovado. Este procedimiento no solo elimina la suciedad, grasa y células muertas, sino que también mejora la oxigenación y la salud general de la piel, permitiendo que los poros respiren y que los productos cosméticos se absorban mejor.

¿En qué consiste una limpieza facial profunda?

El tratamiento de limpieza facial profunda incluye varios pasos personalizados para cada tipo de piel. Comienza con una exfoliación suave para eliminar las células muertas y continúa con la extracción de puntos negros, espinillas y otras impurezas acumuladas en los poros. A esto le sigue la aplicación de mascarillas y sueros específicos que hidratan, calman y rejuvenecen la piel.

Beneficios de la limpieza facial profunda:

Elimina impurezas ayuda a retirar el exceso de grasa, toxinas y contaminantes que obstruyen los poros.
Mejora la textura de la piel: Deja la piel más suave, uniforme y libre de imperfecciones.
Prevención de acné: Ayuda a prevenir la aparición de brotes de acné y puntos negros.
Estimula la regeneración celular: adecuada para todo tipo de pieles, incluidas las pieles grasas, secas y sensibles.
Es ideal para personas que sufren de puntos negros, acné, poros dilatados o simplemente desean mantener su piel sana y libre de impurezas.

Proceso y duración:

El tratamiento dura 45- 60 minutos, dependiendo de las necesidades específicas de cada paciente. Se recomienda realizar una limpieza facial profunda cada mes o cada dos meses para mantener la piel en su mejor estado.`,
    'Babor': `Facial Babor:

Ciencia y Lujo para una Piel Perfecta

El facial Babor es un tratamiento de lujo que combina la ciencia avanzada del cuidado de la piel con ingredientes exclusivos para ofrecer resultados excepcionales. Babor, una marca líder en cosmética profesional, utiliza fórmulas de alta tecnología que tratan las necesidades específicas de cada tipo de piel, proporcionando hidratación, luminosidad y un efecto rejuvenecedor visible desde la primera sesión.

¿Qué incluye el facial Babor?

Este tratamiento comienza con una limpieza profunda para eliminar impurezas y preparar la piel para recibir los activos. Luego se aplican productos especializados de la línea *Babor*, seleccionados según las necesidades del cliente, como ampollas concentradas, sérums y cremas ricas en ingredientes innovadores como péptidos, ácido hialurónico y antioxidantes. El tratamiento finaliza con una mascarilla y un suave masaje que relaja los músculos faciales y optimiza la absorción de los productos.

Beneficios del facial Babor:

Hidratación profunda: Aporta una hidratación intensa y duradera, revitalizando la piel desde el interior.
Rejuvenecimiento visible: Actúa sobre los signos del envejecimiento, mejorando la firmeza y suavizando las arrugas.
Luminosidad y frescura: Aumenta la luminosidad natural de la piel, dejándola radiante y rejuvenecida.
Protección y regeneración celular: Gracias a sus potentes activos antioxidantes, protege la piel contra los daños ambientales y estimula su regeneración.
Tratamiento personalizado: Adaptado a las necesidades de cada cliente, ya sea para pieles secas, grasas, sensibles o maduras.

¿Para quién está indicado?

El facial Babor es ideal para quienes buscan un tratamiento facial de alto rendimiento que combine lo mejor de la naturaleza y la ciencia. Está indicado para todo tipo de pieles y es especialmente recomendado para personas que deseen tratar signos de envejecimiento, deshidratación o falta de luminosidad.

Duración y frecuencia:

El tratamiento dura entre 60 y 90 minutos, dependiendo de las necesidades de la piel. Se recomienda como tratamiento periódico para mantener la piel en su mejor estado o como parte de un régimen de cuidado intensivo.

¡Descubre la ciencia del lujo con Babor!

Reserva tu facial Babor hoy mismo y disfruta de una experiencia que transformará tu piel, dejándola suave, luminosa y visiblemente rejuvenecida.`,
    'Casmara': `MONODOSIS CASMARA

Las Monodosis de Casmara son tratamientos faciales profesionales de alta concentración, diseñados para ofrecer resultados visibles desde la primera aplicación. Cada monodosis contiene activos específicos que actúan de forma directa según la necesidad de tu piel, garantizando eficacia, seguridad y máxima absorción.
En Be Aesthetic R.D., utilizamos las monodosis de Casmara como parte de protocolos personalizados que ayudan a hidratar profundamente, iluminar, reafirmar, regenerar y revitalizar la piel, adaptándose a todo tipo de pieles, incluso las más sensibles.
Beneficios principales:
Alta concentración de principios activos
Resultados inmediatos y progresivos
Mejora visible de la textura, luminosidad y firmeza
Tratamiento personalizado según las necesidades de tu piel
Ideal como tratamiento único o complemento de otros protocolos faciales

Las monodosis de Casmara son ideales para quienes buscan un tratamiento rápido, efectivo y de calidad médica-estética, perfecto antes de un evento especial o como parte de un plan de cuidado facial continuo.`,
    'Peeling': `Peeling Químico
Renovación Controlada para una Piel Más Uniforme

El peeling químico es un procedimiento médico-estético que mejora la textura, el tono y la luminosidad de la piel mediante la exfoliación controlada de sus capas superficiales o medias. Según el objetivo clínico, puede utilizarse para tratar manchas, poros dilatados, líneas finas, marcas postinflamatorias y opacidad cutánea.

¿Cómo funciona el peeling?

Se aplica una solución con activos específicos (por ejemplo, alfa-hidroxiácidos, beta-hidroxiácidos o combinaciones despigmentantes) que acelera la renovación celular. Al retirar las capas dañadas, la piel se regenera con mejor calidad, mayor uniformidad y apariencia más fresca.

Beneficios del peeling:

Mejora del tono: Ayuda a unificar la piel y reducir hiperpigmentación.
Textura más lisa: Disminuye aspereza, poros visibles y pequeñas irregularidades.
Luminosidad inmediata: Favorece una piel más clara y revitalizada.
Apoyo antiaging: Atenúa líneas finas y mejora calidad cutánea.
Tratamiento personalizable: Se ajusta en profundidad, activo y frecuencia según el tipo de piel.

¿Para quién está indicado?

Es ideal para pacientes con piel apagada, manchas leves o moderadas, poros dilatados, acné comedogénico o signos tempranos de envejecimiento. La indicación siempre debe individualizarse tras valoración profesional.

Duración y sesiones:

Cada sesión suele durar entre 30 y 60 minutos. El número de sesiones depende del diagnóstico y del objetivo terapéutico. En protocolos de renovación y mantenimiento, suele recomendarse un esquema por ciclos con seguimiento dermatológico o médico-estético.`,
    'Morpheus8 Rostro y Cuello': `Morpheus 8

Remodelación de la piel con radiofrecuencia fraccionada

Morpheus 8 es una tecnología avanzada que combina radiofrecuencia fraccionada con microneedling para tratar arrugas, flacidez, cicatrices y textura desigual. Este tratamiento no invasivo permite remodelar capas superficiales y profundas de la piel, logrando un rejuvenecimiento completo.

¿Cómo funciona Morpheus 8?

Morpheus 8 utiliza microagujas que penetran la piel y emiten energía de radiofrecuencia en capas profundas, estimulando la producción de colágeno y elastina. Esto mejora la firmeza y calidad cutánea desde adentro hacia afuera. Su intensidad y profundidad se ajustan según las necesidades de cada paciente.

Beneficios de Morpheus 8:

Reafirma la piel y redefine el contorno.
Reduce arrugas y líneas finas.
Mejora textura y cicatrices, incluyendo acné.
Es personalizable según tipo de piel y objetivo.
Ofrece resultados progresivos y duraderos.

Zonas comunes de tratamiento:

Rostro y cuello.
Escote y manos.
Áreas corporales como abdomen, brazos, muslos y glúteos.

¿Para quién está indicado?

Para personas que desean mejorar firmeza, cicatrices, arrugas o líneas de expresión sin recurrir a cirugía.

Sesiones y resultados:

Generalmente se recomiendan entre 1 y 3 sesiones. Los resultados son visibles desde la primera sesión y continúan mejorando durante los meses siguientes.`,
    'Carbón Laser Peel': `Carbón Laser Peel
Limpieza Profunda y Rejuvenecimiento de Alta Precisión

El Carbón Laser Peel (también conocido como Hollywood Peel) es un tratamiento no invasivo que combina una mascarilla de carbón activado con energía láser para purificar la piel, mejorar su textura y reducir la apariencia de poros, grasa y tono irregular.

¿Cómo funciona?

Primero se aplica una capa fina de carbón médico sobre el rostro para captar impurezas, sebo y residuos superficiales. Luego se activa con láser para remover ese material de manera controlada y estimular renovación cutánea. El resultado es una piel más limpia, uniforme y luminosa desde las primeras sesiones.

Beneficios principales:

Limpieza intensiva: Reduce acumulación de grasa, suciedad y células muertas.
Mejora de poros: Disminuye la apariencia de poros dilatados.
Control de brillo: Ayuda a regular piel grasa y tendencia acneica.
Tono más uniforme: Favorece luminosidad y mejor textura general.
Sin incapacidad: Permite retomar actividades el mismo día.

¿Para quién está indicado?

Es ideal para piel mixta o grasa, poros visibles, textura irregular, piel opaca y como mantenimiento para una higiene facial avanzada. También puede integrarse en protocolos combinados de rejuvenecimiento.

Duración y frecuencia:

Una sesión suele durar entre 30 y 45 minutos. La frecuencia se define según el caso, y comúnmente se recomienda en ciclos iniciales y luego mantenimiento periódico para sostener resultados.`,
    'HIFU Facial': `HIFU

Lifting facial no invasivo

HIFU (Ultrasonido Focalizado de Alta Intensidad) es un tratamiento de rejuvenecimiento facial y corporal que ofrece efecto lifting sin cirugía. Utiliza energía de ultrasonido para actuar en capas profundas de la piel, estimulando la producción de colágeno y tensando tejidos de manera natural.

¿Cómo funciona HIFU?

El ultrasonido focalizado calienta las capas profundas sin dañar la superficie cutánea. Este estímulo promueve la regeneración de colágeno y elastina, logrando un efecto tensor progresivo y natural.

Beneficios de HIFU:

Lifting sin cirugía.
Estimulación de colágeno desde el interior.
Resultados duraderos entre 12 y 18 meses según cada caso.
No requiere incisiones ni recuperación prolongada.
Tratamiento versátil para rostro, cuello, escote y zonas corporales.

¿Para quién está indicado?

Para personas con flacidez leve a moderada que buscan rejuvenecimiento progresivo sin pasar por quirófano.

Duración del tratamiento y resultados:

El procedimiento suele durar entre 30 y 90 minutos según el área tratada. La mejoría se aprecia entre los 2 y 3 meses y alcanza su máximo efecto alrededor de los 6 meses.`,
    'Profhilo': `Profhilo

Hidratación y remodelación facial

Profhilo es un tratamiento basado en ácido hialurónico ultra puro, diseñado para mejorar hidratación, elasticidad y firmeza de la piel. A diferencia de los rellenos tradicionales, no busca dar volumen puntual, sino mejorar globalmente la calidad cutánea.

¿Qué es Profhilo?

Es un bioremodelador con ácido hialurónico de alto y bajo peso molecular que estimula colágeno y elastina. Su acción mejora textura, tono y elasticidad sin alterar los rasgos faciales.

Beneficios de Profhilo:

Hidratación profunda en capas internas.
Mejora de firmeza, elasticidad y luminosidad.
Prevención y corrección de signos de envejecimiento.
Estimulación natural de colágeno y elastina.
Resultados naturales y progresivos.

¿Cómo funciona el tratamiento?

Se aplica en puntos estratégicos del rostro o cuerpo, como cuello, escote y manos, permitiendo una distribución uniforme del producto y bioestimulación progresiva.

Duración y mantenimiento:

Generalmente se recomiendan 2 sesiones iniciales con intervalo de 4 semanas y mantenimiento cada 6 meses, según valoración médica.`,
    'Enzimas Recombinantes': `Enzimas Recombinantes

Remodelación y rejuvenecimiento celular

Las enzimas recombinantes representan un avance innovador en estética no invasiva para tratar grasa localizada, flacidez, celulitis y fibrosis. Son proteínas biotecnológicas diseñadas para actuar con precisión sobre estructuras específicas de la piel y del tejido subcutáneo.

¿Qué son las enzimas recombinantes?

Son enzimas que ayudan a mejorar contorno corporal y calidad cutánea mediante protocolos personalizados, sin necesidad de cirugía.

Beneficios del tratamiento:

Reducción de grasa localizada.
Mejora de la flacidez y firmeza.
Apoyo en tratamiento de celulitis y fibrosis.
Resultados progresivos y duraderos.
Alternativa mínimamente invasiva.

¿Cómo funciona el tratamiento?

Se aplican mediante microinyecciones en zonas específicas como abdomen, muslos, brazos o rostro. Según el objetivo terapéutico, se selecciona la combinación enzimática adecuada.

Tipos de enzimas más utilizadas:

Lipasa recombinante: enfocada en grasa localizada.
Colagenasa recombinante: enfocada en fibrosis y calidad del tejido.
Hialuronidasa recombinante: útil en protocolos de remodelación indicados médicamente.

Resultados y sesiones:

El número de sesiones depende de la valoración médica. Los cambios se observan de forma progresiva desde etapas tempranas del tratamiento.`,
    'Mesoterapia NCTF': `6. Mesoterapia NCTF:  
 
Revitalización Celular y Rejuvenecimiento 
 
La mesoterapia NCTF es un tratamiento diseñado para revitalizar la piel desde el interior, 
mejorando su luminosidad, hidratación y elasticidad. Este procedimiento utiliza un complejo 
exclusivo de ácido hialurónico y más de 50 ingredientes activos, como vitaminas, minerales 
y antioxidantes, para nutrir profundamente las células de la piel. 
 
¿Qué es NCTF? 
 
NCTF (New Cellular Treatment Factor) es un complejo desarrollado por *Laboratorios 
Filorga*, compuesto por ácido hialurónico y un cóctel de nutrientes esenciales que ayudan a 
restaurar la vitalidad de la piel. Este tratamiento no solo combate los signos del 
envejecimiento, sino que también mejora la calidad de la piel en general. 
 
Beneficios de la mesoterapia NCTF: 
 
● Hidratación profunda: El ácido hialurónico retiene la humedad, mejorando la 
hidratación desde las capas más profundas de la piel. 
● Estimulación del colágeno: Favorece la producción de colágeno y elastina, 
mejorando la firmeza y elasticidad de la piel. 
● Efecto antioxidante: Las vitaminas y minerales protegen la piel de los daños 
causados por los radicales libres. 
● Mejora la luminosidad: Proporciona un brillo saludable y uniforme, atenuando los 
signos de fatiga y envejecimiento. 
● Prevención del envejecimiento: Actúa como un tratamiento preventivo contra las 
arrugas y la flacidez. 
 
¿Cómo funciona el tratamiento? 
 
El NCTF se aplica mediante microinyecciones en la dermis, donde el cóctel nutritivo se 
distribuye uniformemente. Este proceso estimula la regeneración celular y mejora la 
microcirculación, promoviendo una piel más joven, suave y radiante. La mesoterapia NCTF 
es ideal para tratar el rostro, cuello, escote y manos. 

 
¿Para quién está indicada? 
 
La mesoterapia NCTF está indicada para personas de todas las edades que buscan 
prevenir el envejecimiento prematuro o mejorar la calidad general de su piel. Es ideal para 
pieles cansadas, deshidratadas o con signos de estrés ambiental. 
 
Resultados y sesiones: 
 
Los resultados son visibles desde las primeras sesiones, con una mejora progresiva en la 
textura y luminosidad de la piel. Para obtener resultados óptimos, se recomienda un ciclo 
inicial de 3 a 5 sesiones, seguido de sesiones de mantenimiento cada 6 meses.`,
    'Bioestimuladores de Colágeno': `7. Bioestimuladores de Colágeno  
Rejuvenece tu Piel de Forma Natural 
En Be Aesthetic República Dominicana, entendemos que el colágeno es fundamental 
para mantener la elasticidad y firmeza de la piel. Nuestros tratamientos con 
bioestimuladores de colágeno están diseñados para activar la producción natural de 
colágeno en tu piel, logrando un aspecto más joven y saludable. 
¿Qué son los Bioestimuladores de Colágeno? 
Los bioestimuladores de colágeno son sustancias biocompatibles que se inyectan en la piel 
para estimular la producción de colágeno y elastina. A diferencia de los rellenos dérmicos, 
estos tratamientos no solo rellenan, sino que también promueven la regeneración de la piel 
desde adentro, mejorando la textura y la firmeza a largo plazo. 
Beneficios del Tratamiento 
● Rejuvenecimiento Natural: Estimula la producción de colágeno, mejorando la 
elasticidad y suavizando arrugas y líneas de expresión. 
● Resultados Progresivos: A medida que se produce más colágeno, notarás mejoras 
continuas en la calidad de tu piel durante varios meses. 
● Tratamiento Seguro: Utilizamos productos aprobados y de alta calidad, asegurando 
un tratamiento seguro y efectivo. 
● Versatilidad: Los bioestimuladores se pueden usar en diferentes áreas, como el 
rostro, cuello, escote y manos, adaptándose a tus necesidades específicas. 
Proceso del Tratamiento 
1. Consulta Personalizada: En tu primera cita, evaluaremos tu piel y discutiremos tus 
objetivos estéticos. Te proporcionaremos información detallada sobre el 
procedimiento y resolveremos todas tus dudas. 
2. Aplicación del Tratamiento: El procedimiento, que dura entre 30 y 60 minutos, se 
realiza en un ambiente cómodo. Utilizamos anestesia local para asegurar tu 
comodidad durante el tratamiento. 

3. Resultados Graduales: Tras la aplicación, comenzarás a notar mejoras en la 
textura y firmeza de tu piel a lo largo de las semanas, a medida que el colágeno se 
va regenerando. 
Cuidados Posteriores 
Para optimizar los resultados y asegurar una recuperación adecuada, te recomendamos: 
● Evitar la exposición directa al sol y usar protector solar en el área tratada. 
● No realizar actividades físicas intensas durante las primeras 24 horas. 
● Mantener una buena hidratación y seguir una dieta equilibrada para apoyar la salud 
de tu piel. 
Duración de los Resultados 
Los efectos de los bioestimuladores de colágeno pueden durar entre 12 y 24 meses, 
dependiendo de factores individuales como la edad, el tipo de piel y el estilo de vida. 
Recomendamos sesiones de mantenimiento para maximizar y prolongar los resultados.`,
    'Hilos Tensores PDO': `Hilos Tensores PDO
Eleva y Reafirma tu Belleza

En Be Aesthetic República Dominicana, estamos comprometidos con ofrecerte las soluciones más avanzadas en estética. Los hilos tensores PDO son un tratamiento innovador que permite lograr un efecto lifting sin cirugía, elevando y reafirmando la piel de manera efectiva y segura.

¿Qué son los Hilos Tensores PDO?

Los hilos tensores PDO (polidioxanona) son hilos biodegradables que se insertan en la piel para proporcionar soporte estructural y estimular la producción de colágeno. Este procedimiento no solo mejora la firmeza y la elasticidad de la piel, sino que también ofrece un efecto lifting inmediato.

Beneficios del Tratamiento

Efecto Lifting Inmediato: Los hilos tensores proporcionan un levantamiento instantáneo, mejorando la definición del rostro y el contorno.
Estimulación de Colágeno: A medida que los hilos se descomponen, estimulan la producción natural de colágeno, mejorando la calidad de la piel a largo plazo.
Procedimiento Minimante Invasivo: El tratamiento se realiza con anestesia local y requiere poco tiempo de recuperación, permitiéndote volver rápidamente a tus actividades diarias.
Resultados Naturales: Los hilos se integran con los tejidos, logrando un resultado que se ve y se siente natural.

Proceso del Tratamiento

Consulta Personalizada: En tu primera cita, nuestros especialistas evaluarán tus necesidades y discutiremos tus objetivos estéticos. Te proporcionaremos toda la información sobre el procedimiento y resolveremos tus dudas.
Aplicación de los Hilos: El procedimiento dura aproximadamente entre 30 y 60 minutos. Utilizamos anestesia local para garantizar tu comodidad durante la inserción de los hilos.
Resultados Rápidos: Tras la aplicación, podrás ver una mejora inmediata en la firmeza de tu piel. La estimulación del colágeno continuará durante varios meses, mejorando aún más la calidad de tu piel.

Cuidados Posteriores

Para asegurar una recuperación adecuada y maximizar los resultados, te recomendamos:
Evitar el ejercicio intenso y actividades que generen sudoración excesiva durante 48 horas.
No aplicar maquillaje en el área tratada durante las primeras 24 horas.
Mantener la piel bien hidratada y seguir una rutina de cuidado adecuada.

Duración de los Resultados

Los efectos de los hilos tensores PDO pueden durar entre 12 y 18 meses, dependiendo de factores individuales como el tipo de piel y el estilo de vida. Sugerimos sesiones de mantenimiento para conservar el efecto lifting.`,
    'Plasma Rico en Plaquetas': `Plasma Rico en Plaquetas (PRP)
La Revolución en el Rejuvenecimiento Facial

¿Qué es el Plasma Rico en Plaquetas (PRP)?

El Plasma Rico en Plaquetas (PRP) es un tratamiento estético innovador que utiliza las propiedades regenerativas de la sangre del propio paciente para mejorar la apariencia de la piel y promover la regeneración celular. Este tratamiento se basa en la extracción y concentración de plaquetas, que son componentes sanguíneos ricos en factores de crecimiento.

¿Cómo Funciona el Tratamiento?

Extracción de Sangre: Se realiza una pequeña extracción de sangre del paciente, similar a un análisis clínico.
Centrifugación: La muestra de sangre se coloca en una centrífuga que separa las plaquetas y el plasma de los glóbulos rojos y otros componentes sanguíneos.
Aplicación: El plasma rico en plaquetas se inyecta en las áreas deseadas de la piel, donde los factores de crecimiento estimulan la producción de colágeno y elastina, mejorando la textura y firmeza de la piel.

Beneficios del PRP:

Rejuvenecimiento Facial: Ayuda a reducir arrugas, líneas finas y flacidez, promoviendo un aspecto más juvenil.
Mejora de la Textura de la Piel: Aumenta la hidratación y suavidad de la piel, dejándola más radiante y saludable.
Reducción de Cicatrices y Estrías: Eficaz en el tratamiento de cicatrices de acné y estrías, al estimular la regeneración celular.
Resultados Naturales y Duraderos: Al utilizar componentes de tu propia sangre, el tratamiento es seguro y los resultados son naturales.

¿Qué Esperar Durante el Tratamiento?

El tratamiento de PRP es mínimamente invasivo y generalmente toma alrededor de 60 minutos. Antes de iniciar, se realiza una consulta para evaluar tus necesidades y objetivos. Durante la aplicación, se puede utilizar anestesia tópica para mayor comodidad.

Post-Tratamiento:

Después del procedimiento, es normal experimentar enrojecimiento, hinchazón o sensibilidad en la zona tratada, que suelen desaparecer en pocos días. Se recomienda evitar la exposición solar directa y seguir las indicaciones del especialista para maximizar los resultados.

Resultados:

Los resultados suelen ser visibles después de unas semanas, a medida que el colágeno comienza a regenerarse. Para obtener resultados óptimos, se pueden recomendar varias sesiones, generalmente espaciadas de 4 a 6 semanas.

¿Es el PRP Adecuado para Ti?

El tratamiento de PRP es adecuado para todo tipo de piel y puede ser utilizado en diversas áreas, incluyendo rostro, cuello y manos. Es ideal para quienes buscan un enfoque natural y efectivo para el rejuvenecimiento y mejora de la piel.

¿Listo para Revitalizar Tu Piel?

En Be Aesthetic, nuestro objetivo es ofrecerte las últimas y más efectivas técnicas en tratamientos estéticos. Si estás interesado en aprender más sobre el Plasma Rico en Plaquetas y cómo puede transformar tu piel, contáctanos para una consulta personalizada.`,
    'Factores de Crecimiento': `Factores de Crecimiento

Los Factores de Crecimiento de IR Medical representan una de las terapias más avanzadas en medicina regenerativa estética, diseñadas para estimular la regeneración celular, mejorar la calidad de la piel y promover un rejuvenecimiento profundo desde el interior.

Estos factores de crecimiento actúan activando los mecanismos naturales de reparación de la piel, favoreciendo la producción de colágeno y elastina, mejorando la textura, firmeza, luminosidad y uniformidad del tono. Su acción regeneradora permite tratar signos de envejecimiento, flacidez, daño cutáneo y pérdida de vitalidad de manera eficaz y segura.

En Be Aesthetic R.D., los factores de crecimiento de IR Medical se integran en protocolos personalizados, adaptados a las necesidades específicas de cada paciente, ya sea como tratamiento único o como complemento de otros procedimientos médico-estéticos para potenciar resultados.

Beneficios del tratamiento:

Estimula la regeneración celular profunda.
Aumenta la producción natural de colágeno y elastina.
Mejora la firmeza, textura y luminosidad de la piel.
Contribuye a la reparación y rejuvenecimiento cutáneo.
Tratamiento seguro y mínimamente invasivo.
Resultados progresivos y naturales.`,
    'Láser CO2 en Rostro': `1. Láser CO2 Fraccionado 
Redefine Tu Piel y Restaura Tu Confianza 
En Be Aesthetic República Dominicana, te ofrecemos el tratamiento de láser CO2 
fraccionado, una solución eficaz y avanzada para reducir cicatrices y manchas en la piel. 
Este procedimiento permite transformar la textura de tu piel y mejorar su apariencia de 
manera significativa. 
¿Qué es el Láser CO2 Fraccionado? 
El láser CO2 fraccionado utiliza microhazos de luz para tratar áreas específicas de la piel, 
eliminando las capas dañadas y estimulando la regeneración de colágeno. Este enfoque 

fraccionado significa que solo se tratan partes de la piel, lo que favorece una recuperación 
más rápida y menos molestias. 
Beneficios del Tratamiento 
● Reducción de Cicatrices: Ayuda a suavizar cicatrices de acné, quirúrgicas o 
traumáticas, mejorando la textura de la piel. 
● Desvanecimiento de manchas: Eficaz en el tratamiento de manchas solares, 
hiperpigmentación y melasma, promoviendo un tono de piel más uniforme. 
● Estimulación de colágeno: Favorece la producción de colágeno, lo que resulta en 
una piel más firme y rejuvenecida. 
● Resultados Duraderos: Con el tiempo, los efectos del tratamiento continúan 
mejorando, ofreciendo resultados que pueden durar años. 
Proceso del Tratamiento 
1. Consulta Personalizada: En tu primera cita, nuestros especialistas evaluarán las 
cicatrices y manchas en tu piel, discutiendo tus objetivos estéticos y proporcionando 
información detallada sobre el procedimiento. 
2. Aplicación del Tratamiento: La sesión de láser CO2 fraccionado dura entre 30 y 60 
minutos. Se aplicará anestesia tópica para asegurar tu comodidad durante el 
tratamiento. 
3. Recuperación y Resultados: Es normal experimentar enrojecimiento y una ligera 
sensación de ardor tras el procedimiento. A medida que la piel sana, notarás 
mejoras en la textura y el tono, con resultados que se vuelven más evidentes en las 
semanas siguientes. 
Cuidados Posteriores 
Para asegurar una recuperación óptima y maximizar los resultados, te recomendamos: 
● Evitar la exposición directa al sol y aplicar protector solar en el área tratada. 
● No utilizar maquillaje durante al menos 48 horas. 
● Mantener la piel bien hidratada y seguir las indicaciones de nuestros especialistas. 
 
2. Microagujas para Cicatrices y Manchas  
Renueva tu Piel con Tecnología Innovadora 
En Be Aesthetic República Dominicana, te ofrecemos el tratamiento de microagujas, una 
técnica avanzada y efectiva para mejorar la apariencia de cicatrices y manchas en la piel. 
Este procedimiento no solo promueve la regeneración celular, sino que también ayuda a 
restaurar la luminosidad y uniformidad de tu piel. 
¿Qué son las Microagujas? 
El tratamiento de microagujas, también conocido como terapia de inducción de colágeno, 
utiliza un dispositivo que crea microperforaciones en la piel. Estas pequeñas punciones 

estimulan la producción de colágeno y elastina, mejorando la textura de la piel y ayudando a 
reducir cicatrices, arrugas y manchas. 
Beneficios del Tratamiento 
● Reducción de Cicatrices: Eficaz para suavizar cicatrices de acné, quirúrgicas o 
traumáticas, logrando una piel más uniforme y menos notoria. 
● Desvanecimiento de manchas: Ayuda a tratar manchas solares, hiperpigmentación 
y melasma, promoviendo un tono de piel más claro y homogéneo. 
● Estimulación de colágeno: Favorece la producción de colágeno y elastina, lo que 
resulta en una piel más firme y rejuvenecida. 
● Procedimiento Mínimamente Invasivo: La técnica es relativamente rápida y con 
un tiempo de recuperación corto, permitiendo volver a tus actividades diarias 
rápidamente. 
Proceso del Tratamiento 
1. Consulta Personalizada: Durante tu primera cita, nuestros especialistas evaluarán 
las cicatrices y manchas en tu piel y discutirán tus objetivos estéticos. Te 
proporcionaremos toda la información necesaria sobre el procedimiento. 
2. Aplicación del Tratamiento: La sesión de microagujas dura entre 30 y 60 minutos. 
Se aplica anestesia tópica para asegurar tu comodidad durante el procedimiento. 
3. Recuperación y Resultados: Después del tratamiento, es normal experimentar un 
enrojecimiento leve y una ligera sensación de ardor. A medida que la piel se 
recupera, notarás mejoras en la textura y el tono, con resultados que se vuelven más 
evidentes en las semanas siguientes. 
Cuidados Posteriores 
Para asegurar una recuperación óptima y maximizar los resultados, te recomendamos: 
● Evitar la exposición directa al sol y aplicar protector solar en el área tratada. 
● No utilizar maquillaje durante al menos 24 horas. 
● Mantener la piel hidratada y seguir las indicaciones de nuestros especialistas. 
Duración de los Resultados 
Los resultados del tratamiento de microagujas pueden durar entre 6 meses y 2 años, 
dependiendo de factores como el tipo de piel y el cuidado posterior. Se recomiendan 
sesiones de mantenimiento para prolongar y maximizar los resultados. 
 
3. Morpheus 8  
Revolucionando el Tratamiento de Manchas y Cicatrices 
¿Qué es Morpheus 8? 

Morpheus 8 es un innovador tratamiento estético que combina las técnicas de microaguja y 
radiofrecuencia para rejuvenecer la piel desde adentro hacia afuera. Su tecnología 
avanzada permite una penetración profunda en las capas dérmicas, lo que estimula la 
producción natural de colágeno y elastina, esenciales para mantener la piel firme y 
saludable. 
¿Cómo funciona? 
El tratamiento utiliza microagujas que penetran en la piel, generando pequeñas lesiones 
controladas. Esta acción activa la respuesta natural de curación del cuerpo, que incluye la 
regeneración celular y la producción de colágeno. Al mismo tiempo, la radiofrecuencia 
calienta las capas internas de la piel, mejorando la textura y tono general. 
Beneficios de Morpheus 8: 
● Reducción de manchas: Ayuda a desvanecer manchas solares, hiperpigmentación 
y otras irregularidades del tono de piel. 
● Mejoramiento de Cicatrices: Es especialmente eficaz en la atenuación de 
cicatrices de acné y otras marcas, proporcionando una textura más suave y 
uniforme. 
● Rejuvenecimiento Facial: Mejora la apariencia de arrugas y líneas finas, ofreciendo 
un aspecto más joven y fresco. 
● Efecto Duradero: Los resultados son visibles después de una sola sesión, pero se 
recomiendan múltiples tratamientos para resultados óptimos. 
 
¿Qué Esperar Durante el Tratamiento? 
Antes de comenzar, es fundamental una consulta personalizada con nuestros especialistas 
para evaluar tus necesidades específicas y determinar el número de sesiones necesarias. 
Durante el tratamiento, se aplica un anestésico tópico para minimizar cualquier molestia. La 
sesión dura entre 30 a 60 minutos, dependiendo de las áreas a tratar. 
Post-Tratamiento: 
Tras el procedimiento, es normal experimentar enrojecimiento y sensibilidad en la piel, 
similares a los síntomas de una ligera quemadura solar. Estos efectos secundarios suelen 
desaparecer en unos días. Se recomienda evitar la exposición directa al sol y seguir las 
indicaciones de cuidados posteriores proporcionadas por nuestros especialistas. 
Resultados: 
Los resultados empiezan a ser visibles en unos días, mejorando con el tiempo a medida que 
se produce más colágeno. Para obtener resultados óptimos, se recomienda un plan de 
tratamiento personalizado, que puede incluir de 2 a 4 sesiones, dependiendo de las 
condiciones de la piel y los objetivos deseados. 
¿Es Morpheus 8 para Ti? 

Morpheus 8 es adecuado para todo tipo de piel y se puede utilizar en diversas áreas del 
cuerpo, incluyendo la cara, el cuello y las manos. Sin embargo, es esencial realizar una 
evaluación individual para determinar si este tratamiento es el más adecuado para ti. 
¿Listo para transformar tu piel? 
En Be Aesthetic, nos dedicamos a ofrecerte las últimas innovaciones en tratamientos 
estéticos. Si deseas saber más sobre Morpheus 8 y cómo puede ayudarte a reducir 
manchas y cicatrices, ¡contáctanos hoy mismo para una consulta personalizada! 
 
 
4. Peelings Corporales y Faciales  
 
En Be Aesthetic R.D., entendemos que las manchas en la piel pueden afectar tu confianza y 
bienestar. Por eso, ofrecemos tratamientos de peeling corporal y facial que ayudan a reducir 
la apariencia de manchas leves, dejándote con una piel más uniforme y radiante. 
 
¿Qué es un Peeling? 
 
Un peeling es un procedimiento estético que implica la aplicación de una solución química 
sobre la piel. Este tratamiento tiene como objetivo exfoliar las capas superficiales, 
promoviendo la renovación celular y mejorando la textura y tono de la piel. Existen 
diferentes tipos de peelings, que se clasifican según su profundidad: superficiales, medianos 
y profundos. 
 
Beneficios de los Peelings 
 
● Reducción de manchas: Ayuda a disminuir la visibilidad de manchas solares, 
melasma y otras irregularidades pigmentarias. 
● Mejora la textura: Al eliminar células muertas, se logra una piel más suave y 
uniforme. 
● Estimula la producción de Colágeno: Favorece la elasticidad y firmeza de la piel, 
ayudando a combatir signos de envejecimiento. 
● Resultados Rápidos: Muchos pacientes notan una mejora significativa después de 
una sola sesión. 
 
Tipos de Peelings que Ofrecemos 
 
1. Peeling Facial: 
a. Ideal para tratar manchas leves en el rostro. 
b. Combinamos ácidos como el glicólico, salicílico o láctico, dependiendo de tu 
tipo de piel y necesidades específicas. 
c. Resultados visibles en pocas sesiones, con mínimas molestias. 
 
2. Peeling Corporal: 
a. Perfecto para áreas del cuerpo con manchas, como brazos, piernas y 
espalda. 

b. Utilizamos fórmulas específicas que se adaptan a la sensibilidad de la piel en 
diferentes partes del cuerpo. 
c. Ideal para preparar la piel antes de la exposición al sol, asegurando un 
bronceado más uniforme. 
 
Proceso del Tratamiento 
 
1. Consulta Inicial: Evaluamos tu piel y discutimos tus objetivos. 
2. Preparación de la Piel: Se limpiará y preparará la piel para el peeling. 
3. Aplicación del Peeling: La solución química se aplicará de manera controlada. 
4. Cuidado Post-Tratamiento:Te proporcionaremos instrucciones para cuidar tu piel y 
maximizar los resultados. 
 
Cuidados Posteriores 
 
Es fundamental seguir nuestras recomendaciones para el cuidado de la piel después del 
peeling. Esto incluye evitar la exposición solar, usar protector solar y mantener la piel 
hidratada. 
 
Conclusión 
 
Si buscas una solución efectiva para las manchas leves en tu piel, los peelings corporales y 
faciales en Be Aesthetic R.D. son una excelente opción. Contamos con un equipo de 
profesionales que te guiarán en cada paso del proceso, asegurando resultados óptimos y 
una experiencia agradable. 
 
¡Contáctanos hoy para agendar tu consulta y comienza tu camino hacia una piel más 
radiante!`,
    'Láser CO2 para Manchas Corporales': `Láser CO2 para Manchas Corporales

Procedimiento corporal diseñado para tratar hiperpigmentaciones y manchas localizadas en distintas zonas del cuerpo mediante tecnología láser de alta precisión.

Favorece la renovación de la piel, mejora la uniformidad del tono y aporta una apariencia más clara y homogénea.`,
    'Láser CO2 para Cicatrices Corporales': `Láser CO2 para Cicatrices Corporales

Tratamiento corporal enfocado en mejorar la apariencia de cicatrices al estimular la regeneración del tejido y la síntesis de colágeno.

Permite suavizar irregularidades y mejorar progresivamente la textura de la piel en zonas con marcas o cicatrices.`,
    'Tratamiento de Estrías': `Tratamiento de Estrías
Reparaci?n Progresiva de la Calidad Cut?nea

El tratamiento de estr?as en Be Aesthetic se enfoca en mejorar color, profundidad y textura de las estr?as mediante protocolos combinados que estimulan regeneraci?n d?rmica y s?ntesis de col?geno.

?C?mo se aborda?

Dependiendo del tipo de estr?a (reciente o antigua), la zona corporal y el fototipo de piel, se seleccionan t?cnicas m?dico-est?ticas como microagujas, radiofrecuencia fraccionada, l?ser o protocolos bioestimulantes. El objetivo es lograr una piel m?s uniforme, con mejor elasticidad y menor contraste visual.

Beneficios del tratamiento:

Mejora de textura: Aten?a el relieve y la irregularidad de la estr?a.
Reducci?n de contraste: Ayuda a igualar el color con la piel circundante.
Estimulaci?n de col?geno: Favorece firmeza y calidad cut?nea.
Plan personalizado: Se adapta al tipo de piel, zona y evoluci?n de la lesi?n.
Resultados progresivos: La mejor?a se observa sesi?n a sesi?n.

?Para qui?n est? indicado?

Est? indicado para estr?as en abdomen, muslos, gl?teos, caderas, brazos o mamas, tanto postembarazo como asociadas a cambios de peso o crecimiento. Requiere evaluaci?n profesional para definir expectativas realistas y protocolo ?ptimo.

Duraci?n y sesiones:

La sesi?n suele durar entre 30 y 60 minutos seg?n zona y t?cnica. El n?mero de sesiones var?a por severidad y respuesta individual, con seguimiento peri?dico para consolidar resultados.`,
    'Tratamiento de Manchas': `5. Mesoterapia para el Tratamiento de Manchas  
En Be Aesthetic R.D., ofrecemos la mesoterapia como una solución innovadora y eficaz 
para el tratamiento de manchas en la piel. Este procedimiento no invasivo está diseñado 
para mejorar la apariencia de la piel, proporcionando resultados visibles y duraderos. 
¿Qué es la Mesoterapia? 
La mesoterapia es un tratamiento estético que consiste en la inyección de microdosis de 
medicamentos, vitaminas, minerales y aminoácidos directamente en la dermis. Esta técnica 
estimula la regeneración celular y mejora la circulación, lo que ayuda a reducir las manchas 
y unificar el tono de la piel. 
Beneficios de la Mesoterapia para Manchas 
● Reducción de manchas: Ayuda a aclarar manchas solares, melasma y otras 
hiperpigmentaciones. 

● Estimulación de colágeno: Fomenta la producción de colágeno y elastina, 
mejorando la textura de la piel. 
● Hidratación Profunda: Los ingredientes activos proporcionan hidratación desde el 
interior, dejando la piel suave y radiante. 
● Procedimiento Rápido y Efectivo: Las sesiones suelen durar entre 30 y 60 
minutos, y muchos pacientes notan mejoras después de las primeras sesiones. 
Proceso del Tratamiento 
1. Consulta Inicial: Comenzamos con una evaluación de tu piel y tus necesidades 
específicas. Nuestro equipo te guiará para definir el mejor plan de tratamiento. 
2. Preparación: La piel se limpia y se aplica una crema anestésica para minimizar 
cualquier molestia durante el procedimiento. 
3. Inyecciones: Se administran microinyecciones en las áreas afectadas. La cantidad 
y el tipo de producto utilizado se adaptan a tus requerimientos. 
4. Cuidado Post-Tratamiento: Te proporcionaremos recomendaciones para cuidar tu 
piel después de la sesión, incluyendo el uso de protector solar y productos 
específicos para maximizar los resultados. 
Resultados y Cuidados Posteriores 
Los resultados de la mesoterapia son visibles gradualmente, y el número de sesiones puede 
variar según la gravedad de las manchas y tus objetivos estéticos. Generalmente, se 
recomienda un ciclo de 4 a 6 sesiones para obtener resultados óptimos. 
Después del tratamiento, es importante: 
● Evitar la exposición solar directa. 
● Utilizar protector solar todos los días. 
● Mantener la piel bien hidratada. 
¿Por qué Elegir Be Aesthetic R.D.? 
En Be Aesthetic R.D., contamos con un equipo de profesionales altamente capacitados que 
se dedican a brindarte un servicio personalizado y de calidad. Utilizamos productos de 
primera línea y técnicas avanzadas para garantizar tu satisfacción y bienestar. 
¡No dejes que las manchas afecten tu autoestima! Contáctanos para agendar tu consulta y 
descubre cómo la mesoterapia puede ayudarte a lograr una piel más clara y radiante.`,
    'Mesoterapia Corporal': `1. Mesoterapia Localizada para Reducción de Medidas  
En Be Aesthetic R.D., te ofrecemos la mesoterapia localizada, un tratamiento altamente 
efectivo para la reducción de grasa localizada y medidas, ayudándote a esculpir tu figura de 
manera segura y no invasiva. Si estás buscando una solución para esas áreas difíciles que 
no responden a dieta o ejercicio, este tratamiento es para ti. 
¿Qué es la Mesoterapia Localizada? 
La mesoterapia localizada consiste en la inyección de microdosis de una mezcla 
personalizada de medicamentos, aminoácidos y vitaminas en las capas medias de la piel. 
Este procedimiento está diseñado para tratar de manera específica las áreas del cuerpo 
donde se acumula grasa, promoviendo su eliminación y ayudando a reducir medidas. 
Beneficios de la Mesoterapia Localizada para Reducción de Medidas 
● Eliminación de Grasa Localizada: Eficaz para descomponer los depósitos de 
grasa en áreas específicas como abdomen, muslos, caderas y brazos. 
● Reducción de Medidas: Ayuda a disminuir el tamaño de las áreas tratadas, 
logrando un contorno más armonioso. 
● Resultados Rápidos: Muchos pacientes notan cambios visibles en sus medidas 
después de sólo unas sesiones. 
● No Invasivo y Sin Tiempo de Inactividad: A diferencia de la cirugía, la mesoterapia 
no requiere tiempo de recuperación, permitiéndote retomar tus actividades diarias de 
inmediato. 
Proceso del Tratamiento 
1. Consulta Inicial: Durante tu primera visita, realizaremos una evaluación exhaustiva 
de tus áreas de interés y discutiremos tus objetivos. Nuestro equipo diseñará un plan 
de tratamiento personalizado para ti. 
2. Preparación: La zona a tratar se limpiará y, si es necesario, se aplicará una crema 
anestésica para minimizar cualquier molestia. 

3. Inyecciones: Se administran microinyecciones en las áreas seleccionadas con la 
mezcla de ingredientes activos. La cantidad y frecuencia de las sesiones se ajustan 
a tus necesidades individuales. 
4. Cuidado Post-Tratamiento: Te proporcionaremos recomendaciones específicas 
para maximizar los resultados y cuidar las áreas tratadas. 
Resultados y Cuidados Posteriores 
Los resultados de la mesoterapia localizada son progresivos y, para alcanzar la reducción 
de medidas deseada, generalmente se recomienda un ciclo de 4 a 8 sesiones, dependiendo 
de cada caso. Es importante combinar el tratamiento con hábitos saludables para obtener 
los mejores resultados. 
Después del tratamiento, se aconseja: 
● Mantenerse bien hidratado. 
● Seguir una dieta equilibrada y realizar ejercicio físico. 
● Evitar la exposición solar directa en las áreas tratadas. 
¿Por qué Elegir Be Aesthetic R.D.? 
En Be Aesthetic R.D., nuestro equipo de expertos está comprometido con tu bienestar y 
satisfacción. Utilizamos técnicas avanzadas y productos de calidad para garantizar 
resultados óptimos en la reducción de grasa localizada y medidas. Tu confianza es nuestra 
prioridad.`,
    'Morpheus8 Corporal': `2. Morpheus 8 para la Reducción de Grasa Localizada y Celulitis  
En Be Aesthetic R.D., te ofrecemos Morpheus8, un tratamiento de vanguardia que combina 
la tecnología de microagujas con radiofrecuencia para abordar de manera efectiva la grasa 
localizada y la celulitis. Si buscas una solución innovadora y no invasiva para mejorar la 
apariencia de tu piel, este tratamiento es ideal para ti. 
¿Qué es Morpheus8? 
Morpheus8 es un dispositivo que utiliza microagujas para entregar energía de 
radiofrecuencia en las capas más profundas de la piel. Este procedimiento estimula la 
producción de colágeno y elastina, lo que resulta en una piel más firme y tonificada. Al 
mismo tiempo, Morpheus8 es efectivo en la reducción de la grasa subcutánea, lo que lo 
convierte en una opción excelente para combatir la celulitis y la grasa localizada. 
Beneficios de Morpheus8 para Grasa Localizada y Celulitis 
● Reducción de Grasa Localizada: Morpheus8 ayuda a destruir las células de grasa 
en áreas específicas, logrando una reducción efectiva en el volumen y medidas. 
● Mejora de la Apariencia de la Celulitis: El tratamiento suaviza la piel y mejora su 
textura, disminuyendo la apariencia de la celulitis. 

● Estímulo del Colágeno: La energía de radiofrecuencia promueve la producción de 
colágeno, lo que mejora la firmeza y elasticidad de la piel. 
● Tratamiento No Invasivo: Morpheus8 no requiere cirugía ni un tiempo de 
recuperación prolongado, permitiéndote retomar tus actividades diarias casi de 
inmediato. 
Proceso del Tratamiento 
1. Consulta Inicial: Comenzamos con una evaluación detallada de tus áreas de 
interés y tus objetivos. Nuestro equipo diseñará un plan de tratamiento adaptado a 
tus necesidades específicas. 
2. Preparación de la Piel: Antes del procedimiento, la piel se limpiará y se aplicará 
una crema anestésica para garantizar tu comodidad durante el tratamiento. 
3. Aplicación de Morpheus8: Utilizando el dispositivo de Morpheus8, se realizarán 
microinyecciones en las áreas seleccionadas. El tratamiento dura aproximadamente 
30-60 minutos, dependiendo de las áreas a tratar. 
4. Cuidado Post-Tratamiento: Te proporcionaremos instrucciones específicas sobre el 
cuidado de la piel posterior al tratamiento, incluyendo la aplicación de productos 
recomendados y consejos sobre la exposición solar. 
Resultados y Cuidados Posteriores 
Los resultados de Morpheus8 son visibles de forma progresiva, y la mayoría de los 
pacientes notan una mejora en la textura de la piel y la reducción de grasa tras unas pocas 
sesiones. Para resultados óptimos, se recomienda un ciclo de 2 a 4 tratamientos, según 
cada caso. 
Después del tratamiento, es importante: 
● Mantenerse hidratado. 
● Evitar la exposición directa al sol en las áreas tratadas. 
● Seguir un estilo de vida saludable con una dieta equilibrada y ejercicio regular. 
¿Por qué Elegir Be Aesthetic R.D.? 
En Be Aesthetic R.D., contamos con un equipo de profesionales altamente capacitados y 
comprometidos con tu satisfacción. Utilizamos la tecnología más avanzada y ofrecemos un 
enfoque personalizado para cada paciente, asegurando resultados efectivos y seguros. 
¡No esperes más para mejorar la apariencia de tu piel y esculpir tu figura! Contáctanos hoy 
para agendar tu consulta y descubre cómo Morpheus8 puede ayudarte a lograr tus objetivos 
estéticos.`,
    'Thermage FLX': `3. Thermage FLX  
 

Para la Reducción de Grasa Localizada y Celulitis  
En Be Aesthetic R.D., te ofrecemos Thermage FLX, un tratamiento innovador que utiliza 
tecnología de radiofrecuencia para abordar de manera efectiva la grasa localizada y mejorar 
la apariencia de la celulitis. Si buscas una solución no invasiva para tonificar tu piel y 
esculpir tu figura, Thermage FLX es la opción ideal. 
¿Qué es Thermage FLX? 
Thermage FLX es un procedimiento estético avanzado que emplea energía de 
radiofrecuencia para calentar las capas profundas de la piel. Este tratamiento estimula la 
producción de colágeno y elastina, resultando en una piel más firme y tonificada. Thermage 
FLX es particularmente eficaz en la reducción de grasa subcutánea y en la mejora de la 
textura de la piel afectada por la celulitis. 
Beneficios de Thermage FLX para Grasa Localizada y Celulitis 
● Reducción de Grasa Localizada: Ayuda a descomponer las células de grasa en 
áreas específicas, logrando una disminución en el volumen y las medidas. 
● Mejora de la Apariencia de la Celulitis: Suaviza la piel y mejora su textura, 
reduciendo la visibilidad de la celulitis. 
● Estimulación del Colágeno: Promueve la regeneración de colágeno, mejorando la 
firmeza y elasticidad de la piel. 
● Tratamiento No Invasivo: No requiere cirugía ni tiempo de inactividad, 
permitiéndote retomar tus actividades cotidianas de inmediato. 
Proceso del Tratamiento 
1. Consulta Inicial: En tu primera cita, realizaremos una evaluación completa de tus 
áreas de interés y tus objetivos estéticos. Nuestro equipo te proporcionará un plan 
de tratamiento personalizado. 
2. Preparación de la Piel: La zona a tratar se limpiará, y si es necesario, se aplicará 
una crema anestésica para garantizar tu comodidad durante el procedimiento. 
3. Aplicación de Thermage FLX: Utilizando el dispositivo Thermage FLX, se aplicará 
la energía de radiofrecuencia en las áreas seleccionadas. El tratamiento suele durar 
entre 30 y 90 minutos, dependiendo de la extensión de la zona a tratar. 
4. Cuidado Post-Tratamiento: Te proporcionaremos recomendaciones específicas 
sobre el cuidado de la piel después del tratamiento, incluyendo consejos sobre la 
exposición solar y productos para maximizar los resultados. 
Resultados y Cuidados Posteriores 
Los resultados de Thermage FLX son visibles de forma gradual, con mejoras continuas 
durante varios meses a medida que se produce nuevo colágeno. La mayoría de los 
pacientes notan una mejora significativa en la textura de la piel y la reducción de grasa tras 
una sola sesión. Se recomienda una sesión anual para mantener los resultados. 
Después del tratamiento, es importante: 

● Mantenerse bien hidratado. 
● Seguir una dieta equilibrada y realizar ejercicio regular. 
● Evitar la exposición solar directa en las áreas tratadas. 
¿Por qué Elegir Be Aesthetic R.D.? 
En Be Aesthetic R.D., contamos con un equipo de profesionales altamente capacitados y 
comprometidos con tu bienestar. Utilizamos tecnología avanzada y un enfoque 
personalizado para ofrecerte resultados efectivos y seguros. 
¡Transforma tu figura y mejora la apariencia de tu piel con Thermage FLX! Contáctanos hoy 
para agendar tu consulta y descubre cómo este tratamiento puede ayudarte a alcanzar tus 
objetivos estéticos. 
 
4. Aqualyx Corporal  
En Be Aesthetic R.D., te ofrecemos Aqualyx, un tratamiento innovador diseñado para la 
reducción de grasa localizada de manera efectiva y no invasiva. Si buscas esculpir tu figura 
y eliminar los depósitos de grasa que no desaparecen con dieta y ejercicio, Aqualyx es la 
solución ideal. 
¿Qué es Aqualyx? 
Aqualyx es una solución inyectable compuesta por un agente que actúa como un lipolítico, 
diseñado para eliminar la grasa localizada en diversas áreas del cuerpo. Este tratamiento 
utiliza la técnica de inyección directa en las zonas a tratar, donde la solución se infiltra en las 
células de grasa, ayudando a descomponerlas y facilitando su eliminación natural por el 
organismo. 
 
 
Beneficios de Aqualyx Corporal 
● Reducción de Grasa Localizada: Eficaz en áreas como abdomen, flancos, muslos, 
caderas y brazos, donde la grasa tiende a acumularse. 
● No Invasivo: Aqualyx es un tratamiento no quirúrgico, lo que significa que no hay 
necesidad de incisiones ni tiempo de recuperación prolongado. 
● Resultados Graduales y Naturales: Los efectos se notan progresivamente a 
medida que el cuerpo elimina la grasa descompuesta, lo que produce resultados 
naturales y armoniosos. 
● Procedimiento Rápido: Las sesiones suelen durar entre 30 y 60 minutos, 
permitiendo que puedas retomar tus actividades diarias inmediatamente. 
Proceso del Tratamiento 

1. Consulta Inicial: En tu primera cita, realizaremos una evaluación exhaustiva de tus 
áreas de interés y discutiremos tus objetivos. Nuestro equipo te proporcionará un 
plan de tratamiento adaptado a tus necesidades. 
2. Preparación: La zona a tratar se limpiará y, si es necesario, se aplicará una crema 
anestésica para garantizar tu comodidad durante las inyecciones. 
3. Aplicación de Aqualyx: Se realizarán microinyecciones en las áreas seleccionadas. 
La cantidad y frecuencia de las sesiones dependerán de tus objetivos y del área a 
tratar. 
4. Cuidado Post-Tratamiento: Te proporcionaremos instrucciones sobre cómo cuidar 
la zona tratada, así como recomendaciones sobre actividad física y cuidados de la 
piel. 
Resultados y Cuidados Posteriores 
Los resultados de Aqualyx se comienzan a notar generalmente a partir de la segunda 
semana después del tratamiento, con mejoras continuas a medida que el cuerpo metaboliza 
la grasa. Para obtener resultados óptimos, se recomienda realizar entre 2 y 4 sesiones, 
dependiendo de la cantidad de grasa a eliminar y las áreas tratadas. 
Después del tratamiento, es importante: 
● Mantenerse bien hidratado. 
● Seguir una dieta equilibrada y realizar ejercicio regular para potenciar los resultados. 
● Evitar la exposición solar directa en las áreas tratadas durante los primeros días. 
¿Por qué Elegir Be Aesthetic R.D.? 
En Be Aesthetic R.D., contamos con un equipo de profesionales altamente capacitados y 
dedicados a brindarte una atención de calidad. Utilizamos técnicas avanzadas y productos 
seguros para ofrecerte resultados efectivos y satisfactorios en la reducción de grasa 
localizada. 
¡Es hora de transformar tu figura y sentirte mejor contigo mismo! Contáctanos hoy para 
agendar tu consulta y descubre cómo Aqualyx puede ayudarte a alcanzar tus objetivos 
estéticos. 
5. Enzimas Recombinantes PB Serum  
Para Grasa Localizada  
En Be Aesthetic R.D., te ofrecemos el innovador tratamiento con enzimas recombinantes 
PB Serum, una solución eficaz y no invasiva para la reducción de grasa localizada. Si 
deseas esculpir tu figura y mejorar la apariencia de áreas específicas del cuerpo, este 
tratamiento es perfecto para ti. 
¿Qué es PB Serum? 
PB Serum es un producto a base de enzimas recombinantes que actúan específicamente 
sobre las células adiposas, facilitando la eliminación de grasa localizada. Este tratamiento 

está diseñado para ser inyectado en áreas con acumulación de grasa, donde las enzimas 
ayudan a descomponer las células de grasa y mejorar la textura de la piel. 
Beneficios del PB Serum para Grasa Localizada 
● Reducción Efectiva de Grasa Localizada: Ayuda a eliminar depósitos de grasa en 
áreas como abdomen, flancos, muslos y brazos. 
● Mejora de la Textura de la Piel: Contribuye a una piel más suave y tonificada, 
minimizando la apariencia de la celulitis. 
● No Invasivo: El tratamiento es rápido y no requiere cirugía ni tiempo de 
recuperación prolongado. 
● Resultados Graduales y Naturales: Los efectos son visibles a medida que el 
cuerpo elimina la grasa descompuesta, logrando una apariencia armoniosa y natural. 
Proceso del Tratamiento 
1. Consulta Inicial: En tu primera visita, realizaremos una evaluación completa de tus 
áreas de interés y discutiremos tus objetivos estéticos. Nuestro equipo te ofrecerá un 
plan de tratamiento personalizado. 
2. Preparación: La zona a tratar se limpiará y, si es necesario, se aplicará una crema 
anestésica para asegurar tu comodidad durante las inyecciones. 
3. Aplicación del PB Serum: Se realizarán microinyecciones del serum en las áreas 
seleccionadas. La cantidad y frecuencia de las sesiones se adaptarán a tus 
necesidades y objetivos. 
4. Cuidado Post-Tratamiento: Te proporcionaremos instrucciones sobre cómo cuidar 
la zona tratada, así como recomendaciones sobre actividad física y cuidados de la 
piel. 
Resultados y Cuidados Posteriores 
Los resultados del tratamiento con PB Serum son visibles de forma progresiva, y la mayoría 
de los pacientes comienzan a notar mejoras a partir de la segunda o tercera semana 
después de la sesión. Se recomienda realizar entre 2 y 4 sesiones para obtener resultados 
óptimos. 
Después del tratamiento, es importante: 
● Mantenerse bien hidratado. 
● Seguir una dieta equilibrada y realizar ejercicio regular para potenciar los resultados. 
● Evitar la exposición solar directa en las áreas tratadas durante los primeros días. 
¿Por qué Elegir Be Aesthetic R.D.? 
En Be Aesthetic R.D., nuestro equipo de profesionales está altamente capacitado y 
comprometido con tu bienestar. Utilizamos productos de calidad y técnicas avanzadas para 
ofrecerte resultados efectivos y satisfactorios en la reducción de grasa localizada. 
¡Es momento de transformar tu figura y sentirte mejor contigo mismo! Contáctanos hoy para 
agendar tu consulta y descubre cómo las enzimas recombinantes PB Serum pueden 
ayudarte a alcanzar tus objetivos estéticos.`,
    'Cavitación': `6. Cavitación: Redefine tu Silueta 
¿Qué es la Cavitación? 
La cavitación es un tratamiento estético no invasivo que utiliza tecnología de ultrasonido 
para eliminar la grasa localizada, combatir la celulitis y mejorar la flacidez de la piel. A través 
de ondas ultrasónicas, se generan burbujas de vacío en el tejido graso, que al colapsar, 
destruyen las células de grasa. Este proceso permite que el cuerpo elimine de forma natural 
las grasas acumuladas. 
Beneficios de la Cavitación 
● Reducción Efectiva de Grasa Localizada: Ideal para áreas específicas como 
abdomen, muslos, caderas y brazos. 
● Mejora de la Apariencia de la Celulitis: Suaviza la textura de la piel y reduce la 
apariencia de piel de naranja. 
● Aumento de la Elasticidad de la Piel: Estimula la producción de colágeno, 
mejorando la firmeza y tonicidad. 
● Tratamiento No Invasivo: Sin necesidad de anestesia ni tiempo de recuperación, 
puedes retomar tus actividades diarias inmediatamente. 
● Resultados Visibles: Muchos de nuestros clientes notan cambios positivos después 
de las primeras sesiones. 
● Estimulación de la Circulación: Favorece el drenaje linfático y mejora la circulación 
sanguínea. 
Cuidados Posteriores 
Para maximizar los resultados de tu tratamiento de cavitación, sigue estos consejos: 
1. Hidratación Adecuada: Bebe abundante agua para ayudar a eliminar las toxinas y 
las células de grasa destruidas. 
2. Alimentación Saludable: Evita el alcohol y alimentos altos en grasa durante 24 a 48 
horas después del tratamiento. 
3. Ejercicio Regular: Incorpora actividad física moderada para potenciar los resultados 
y favorecer el drenaje linfático. 
4. Cuidado de la Piel: Aplica cremas hidratantes y reafirmantes para mejorar la textura 
de tu piel. 
5. Evita Sauna y Baños Calientes: Es recomendable abstenerse de estas actividades 
en las primeras 48 horas post-tratamiento. 
6. Sesiones Recomendadas: Para resultados óptimos, se sugieren de 6 a 10 
sesiones. 
Consideraciones Finales 

Antes de iniciar tu tratamiento de cavitación en Be Aesthetic RD, te invitamos a una consulta 
con nuestros profesionales, quienes evaluarán tus necesidades y te guiarán en el proceso. 
Recuerda que la cavitación es un complemento estético, no un método de pérdida de peso. 
¡Descubre una nueva versión de ti mismo en Be Aesthetic RD! 
 
SUBCATEGORIA: Varices y arañas vasculares  
1. Escleroterapia:  
Di Adiós a las Varices 
¿Qué es la Escleroterapia? 
La escleroterapia es un tratamiento médico estético diseñado para eliminar las varices y las 
venas pequeñas o arañas vasculares. Durante el procedimiento, se inyecta una solución 
esclerosante en las venas afectadas. Esta solución provoca una reacción que hace que las 
venas se cierren y, con el tiempo, se reabsorban por el cuerpo. Es un método efectivo y 
mínimamente invasivo para mejorar la apariencia de las piernas y la salud vascular. 
Beneficios de la Escleroterapia 
● Eliminación Efectiva de Varices: La escleroterapia es altamente efectiva para 
tratar varices y venas de araña, mejorando la apariencia de las piernas. 
● Procedimiento Rápido: Las sesiones suelen durar entre 15 y 30 minutos, lo que 
permite que puedas regresar a tus actividades cotidianas sin complicaciones. 
● Mínimamente Invasivo: No requiere anestesia general ni hospitalización, lo que 
reduce el riesgo de complicaciones. 
● Recuperación Rápida: La mayoría de los pacientes pueden retomar sus actividades 
diarias inmediatamente después del tratamiento. 
● Resultados Duraderos: Con el tratamiento adecuado, los resultados pueden ser 
permanentes, con un aspecto más saludable y estético en las piernas. 
Cuidados Posteriores 
Para maximizar los resultados de tu escleroterapia, es importante seguir estas 
recomendaciones: 
1. Uso de Medias de Compresión: Se recomienda usar medias de compresión 
durante al menos 1 a 2 semanas después del tratamiento para favorecer la 
circulación y la recuperación. 
2. Hidratación: Mantente bien hidratado para ayudar a tu cuerpo en el proceso de 
recuperación. 
3. Evitar Actividades Físicas Intensas: Durante los primeros días después del 
tratamiento, evita actividades que requieran esfuerzo físico intenso, como correr o 
levantar pesas. 

4. Exposición Solar: Protege la zona tratada de la exposición solar directa y evita las 
camas de bronceado por al menos un mes. 
5. Control de la Salud: Si experimentas dolor, hinchazón excesiva o cualquier otra 
reacción inusual, consulta con nuestro equipo médico. 
6. Seguimiento: Asiste a las citas de seguimiento programadas para evaluar la 
evolución del tratamiento y realizar posibles sesiones adicionales si es necesario. 
Consideraciones Previas 
Antes de someterte a la escleroterapia en Be Aesthetic RD, es fundamental considerar lo 
siguiente: 
● Consulta Médica: Realiza una consulta con nuestros especialistas para evaluar tu 
historial médico, así como cualquier condición existente que pueda influir en el 
tratamiento. 
● Medicamentos y Suplementos: Informa a tu médico sobre cualquier medicamento 
o suplemento que estés tomando, ya que algunos pueden afectar la coagulación 
sanguínea. 
● Expectativas Realistas: Ten en cuenta que los resultados pueden variar entre 
individuos. Es importante tener expectativas realistas sobre el tratamiento. 
● Condiciones de Salud: Pacientes con ciertas condiciones de salud, como 
problemas cardíacos o de coagulación, deben ser evaluados cuidadosamente antes 
del tratamiento. 
● No Embarazo: Se recomienda que las mujeres no estén embarazadas ni en periodo 
de lactancia al momento de realizar el tratamiento. 
Consideraciones Finales 
Recupera la confianza en tus piernas y luce un aspecto más saludable con Be Aesthetic 
RD. Te invitamos a programar una consulta personalizada donde nuestros profesionales te 
guiarán a través del proceso y te ayudarán a determinar el mejor plan de tratamiento para 
tus necesidades. 
 
 
 
 
2. Terapia de Varices con Láser 
¿Qué es la Terapia de Varices con Láser? 
La terapia de varices con láser es un tratamiento avanzado y mínimamente invasivo que 
utiliza tecnología láser para eliminar las venas varicosas. Este procedimiento se realiza 
mediante la aplicación de luz láser en las venas afectadas, lo que provoca el cierre de estas 
venas sin necesidad de incisiones. Con el tiempo, las venas tratadas se reabsorben y 

desaparecen, mejorando la apariencia de las piernas y aliviando síntomas asociados como 
el dolor y la pesadez. 
Beneficios de la Terapia de Varices con Láser 
● Eficacia Comprobada: Este método ha demostrado ser efectivo para reducir 
significativamente las varices y venas de araña. 
● Mínimamente Invasivo: A diferencia de los tratamientos quirúrgicos, la terapia con 
láser no requiere anestesia general ni hospitalización. 
● Recuperación Rápida: La mayoría de los pacientes pueden retomar sus actividades 
diarias poco después del tratamiento, con un mínimo de molestias. 
● Resultados Duraderos: Con un tratamiento adecuado, los resultados pueden ser 
permanentes, brindando una mejora notable en la estética de las piernas. 
● Reducción de Síntomas: Ayuda a aliviar síntomas como dolor, pesadez y 
calambres en las piernas, mejorando la calidad de vida. 
Recomendaciones Previas 
Antes de someterte a la terapia de varices con láser en Be Aesthetic RD, considera lo 
siguiente: 
● Consulta Médica: Realiza una evaluación médica completa con nuestros 
especialistas para discutir tu historial médico y cualquier condición que pueda afectar 
el tratamiento. 
● Medicamentos y Suplementos: Informa a tu médico sobre cualquier medicamento 
o suplemento que estés tomando, especialmente aquellos que puedan afectar la 
coagulación sanguínea. 
● Expectativas Realistas: Es importante tener expectativas realistas sobre los 
resultados, que pueden variar según el caso individual. 
● Condiciones de Salud: Asegúrate de que no existan condiciones de salud que 
puedan contraindicar el tratamiento, como problemas cardíacos o de coagulación. 
● No Embarazo: Las mujeres embarazadas o en periodo de lactancia deben consultar 
a un médico antes de proceder. 
Cuidados Posteriores 
Para maximizar los resultados y asegurar una recuperación óptima después de la terapia de 
varices con láser, sigue estas recomendaciones: 
1. Uso de Medias de Compresión: Se recomienda el uso de medias de compresión 
durante al menos 1 a 2 semanas después del tratamiento para ayudar a la 
circulación. 
2. Hidratación: Mantente bien hidratado para facilitar el proceso de recuperación. 
3. Evitar Actividades Intensas: Durante los primeros días, evita actividades físicas 
intensas, como correr o levantar pesas. 
4. Exposición Solar: Protege la zona tratada de la exposición solar directa y evita las 
camas de bronceado durante al menos un mes. 

5. Control de Síntomas: Si experimentas dolor, hinchazón excesiva o cualquier 
reacción inusual, contacta a nuestro equipo médico. 
6. Seguimiento: Asiste a las citas de seguimiento programadas para evaluar la 
evolución del tratamiento. 
Consideraciones Finales 
Recupera la confianza en tus piernas y mejora tu bienestar con la terapia de varices con 
láser en Be Aesthetic RD. Te invitamos a agendar una consulta personalizada con nuestros 
profesionales, quienes te guiarán a través del proceso y diseñarán un plan de tratamiento 
adaptado a tus necesidades. 
¡No esperes más para lucir unas piernas saludables y hermosas! 
 
SUBCATEGORIA: Blanqueamientos`,
    'Blanqueamientos': `1. Blanqueamientos Químicos 
Ilumina tu Piel 
¿Qué son los Blanqueamientos Químicos? 
Los blanqueamientos químicos son tratamientos estéticos diseñados para aclarar la piel y 
reducir manchas, hiperpigmentación y otros tonos desiguales. Utilizando agentes químicos 
como el ácido glicólico, el ácido kójico o el peróxido de hidrógeno, este procedimiento 
exfolia las capas superficiales de la piel, promoviendo una renovación celular que resulta en 
una piel más uniforme y luminosa. 
Beneficios de los Blanqueamientos Químicos 
● Reducción de Manchas: Ayuda a disminuir la apariencia de manchas solares, de la 
edad y melasma. 
● Mejora del Tono de Piel: Promueve un tono más uniforme, dándole a la piel un 
aspecto más fresco y juvenil. 
● Exfoliación Profunda: Elimina células muertas de la piel, mejorando la textura y 
suavidad. 
● Estimulación de Colágeno: Favorece la producción de colágeno, lo que puede 
ayudar a mejorar la elasticidad de la piel. 
● Resultados Rápidos: Muchos pacientes notan cambios visibles después de una 
sola sesión. 
Recomendaciones Previas 
Antes de someterte a un blanqueamiento químico en Be Aesthetic RD, es importante 
considerar lo siguiente: 

● Consulta Médica: Programa una consulta con nuestros especialistas para evaluar 
tu tipo de piel y determinar el tratamiento adecuado para ti. 
● Historia de Piel: Informa a tu médico sobre cualquier problema de piel anterior, 
alergias o tratamientos previos que hayas recibido. 
● Evitar Sol: Evita la exposición solar directa y el uso de bronceadores al menos una 
semana antes del tratamiento para minimizar el riesgo de irritación. 
● No Uso de Retinoides: Si estás usando productos con retinoides, interrúmpelos al 
menos una semana antes del tratamiento. 
Cuidados Posteriores 
Para asegurar resultados óptimos y una recuperación adecuada después del 
blanqueamiento químico, sigue estas recomendaciones: 
1. Hidratación: Mantén tu piel bien hidratada utilizando cremas humectantes 
recomendadas por tu especialista. 
2. Protección Solar: Usa protector solar de amplio espectro (SPF 30 o más) 
diariamente para proteger tu piel de la radiación UV y prevenir la reaparición de 
manchas. 
3. Evitar Exfoliantes Fuertes: No utilices exfoliantes agresivos, ácidos o tratamientos 
que irriten la piel en las semanas siguientes al tratamiento. 
4. Control de Síntomas: Si experimentas enrojecimiento o irritación, utiliza productos 
calmantes y consulta a nuestro equipo si la molestia persiste. 
5. Seguimiento: Asiste a las citas de seguimiento programadas para evaluar la 
respuesta de tu piel y ajustar el tratamiento según sea necesario. 
Consideraciones Finales 
Ilumina tu piel y recupera su belleza natural con los blanqueamientos químicos en Be 
Aesthetic RD. Te invitamos a agendar una consulta personalizada con nuestros 
profesionales, quienes te guiarán a través del proceso y diseñarán un plan de tratamiento 
adaptado a tus necesidades. 
¡No esperes más para lograr el tono de piel que siempre has deseado! 
 
2. Blanqueamiento con Láser CO2 Fraccionado 
Beneficios del Blanqueamiento con Láser CO2 Fraccionado 
● Reducción de Manchas y Hiperpigmentación: Ayuda a disminuir la apariencia de 
manchas solares, melasma y otras irregularidades en el tono de piel. 
● Mejora de la Textura de la Piel: Exfolia suavemente las capas superficiales, 
mejorando la suavidad y elasticidad de la piel. 
● Estimulación de Colágeno: Promueve la producción de colágeno, contribuyendo a 
una piel más firme y rejuvenecida. 

● Resultados Duraderos: Con el tratamiento adecuado, los resultados pueden ser 
significativos y duraderos. 
● Mínimamente Invasivo: Aunque es un procedimiento láser, es menos agresivo que 
la cirugía, lo que significa menos tiempo de recuperación. 
Áreas de Aplicación 
El blanqueamiento con láser CO2 fraccionado se puede aplicar en diversas áreas, 
incluyendo: 
● Cara: Ideal para tratar manchas, cicatrices y mejorar la textura general. 
● Cuello: Para unificar el tono y mejorar la apariencia de la piel. 
● Escote: Ayuda a reducir manchas y mejorar la textura en esta zona expuesta. 
● Manos: Reduce la apariencia de manchas de la edad y mejora la luminosidad. 
Tiempo de las Sesiones 
● Duración: Las sesiones de blanqueamiento con láser CO2 fraccionado suelen durar 
entre 30 y 60 minutos, dependiendo del área a tratar y la extensión del tratamiento. 
● Número de Sesiones: La cantidad de sesiones puede variar según las necesidades 
individuales, pero generalmente se recomienda entre 2 y 4 sesiones para obtener 
resultados óptimos, con intervalos de 4 a 6 semanas entre cada tratamiento. 
Recomendaciones Previas 
Antes de someterte a un blanqueamiento con láser CO2 fraccionado en Be Aesthetic RD, 
considera lo siguiente: 
● Consulta Médica: Programa una consulta con nuestros especialistas para evaluar 
tu tipo de piel y determinar si este tratamiento es adecuado para ti. 
● Historial de Piel: Informa a tu médico sobre cualquier problema de piel anterior, 
alergias o tratamientos recientes que hayas recibido. 
● Evitar Sol: Minimiza la exposición al sol y evita el uso de bronceadores al menos 2 
semanas antes del tratamiento para reducir el riesgo de irritación. 
● No Uso de Retinoides: Si estás utilizando productos con retinoides, interrúmpelos 
al menos una semana antes del tratamiento. 
Cuidados Posteriores 
Para asegurar resultados óptimos y una recuperación adecuada después del 
blanqueamiento con láser CO2 fraccionado, sigue estas recomendaciones: 
1. Hidratación: Mantén la piel bien hidratada con cremas recomendadas por tu 
especialista. 
2. Protección Solar: Aplica un protector solar de amplio espectro (SPF 30 o más) 
diariamente para proteger la piel y prevenir la reaparición de manchas. 
3. Evitar Exfoliantes Fuertes: No utilices productos exfoliantes ni tratamientos que 
puedan irritar la piel en las semanas posteriores al tratamiento. 

4. Control de Síntomas: Si experimentas enrojecimiento o molestias, utiliza productos 
calmantes y consulta a nuestro equipo si los síntomas persisten. 
5. Seguimiento: Asiste a las citas de seguimiento programadas para evaluar la 
respuesta de tu piel y ajustar el tratamiento según sea necesario. 
Consideraciones Finales 
Transforma la apariencia de tu piel y recupera su luminosidad con el blanqueamiento láser 
CO2 fraccionado en Be Aesthetic RD. Te invitamos a agendar una consulta personalizada 
con nuestros profesionales, quienes te guiarán en el proceso y diseñarán un plan de 
tratamiento adaptado a tus necesidades. 
¡No esperes más para disfrutar de una piel más clara y rejuvenecida! 
 
 
 
SUBCATEGORIA: Depilación Láser`,
    'Depilación Láser Diodo': `1. Depilación Láser Diodo 
Adiós al Vello No Deseado 
¿Qué es la Depilación Láser Diodo? 
La depilación láser diodo es un método avanzado y efectivo para la eliminación permanente 
del vello no deseado. Utiliza un láser de diodo que emite luz en una longitud de onda 
específica, la cual es absorbida por la melanina en el folículo piloso. Este proceso daña el 
folículo y reduce su capacidad de producir vello, resultando en una piel suave y libre de 
vello. 
Beneficios de la Depilación Láser Diodo 
● Eficiencia y Rapidez: Los tratamientos son relativamente rápidos, permitiendo tratar 
áreas grandes en poco tiempo. 
● Resultados Duraderos: Con el número adecuado de sesiones, muchos pacientes 
experimentan una reducción permanente del vello. 
● Menos Dolorosa: El láser diodo está diseñado para ser menos doloroso que otros 
métodos de depilación láser, ofreciendo una experiencia más cómoda. 
● Seguridad: Adecuado para diferentes tipos de piel y colores de vello, lo que lo 
convierte en una opción versátil. 
● Reducción de Irritación: A diferencia de la cera o el afeitado, la depilación láser 
disminuye el riesgo de irritación y foliculitis. 
Recomendaciones Previas 

Antes de someterte a la depilación láser diodo en Be Aesthetic RD, considera lo siguiente: 
● Consulta Médica: Programa una consulta para evaluar tu tipo de piel y vello, y 
determinar el número de sesiones necesarias. 
● Evitar el Sol: Minimiza la exposición solar y evita el bronceado en las áreas a tratar 
al menos 2 semanas antes del procedimiento. 
● No Arrancar el Vello: Evita la depilación con cera, pinzas o métodos que arranquen 
el vello al menos 4 semanas antes de tu cita. 
● Hidratación: Mantén la piel hidratada y saludable antes del tratamiento. 
Cuidados Posteriores 
Para asegurar resultados óptimos y una recuperación adecuada después de la depilación 
láser diodo, sigue estas recomendaciones: 
1. Protección Solar: Aplica un protector solar de amplio espectro (SPF 30 o más) en 
las áreas tratadas, evitando la exposición al sol durante al menos 2 semanas. 
2. Hidratación: Mantén la piel bien hidratada con lociones suaves y recomendadas por 
tu especialista. 
3. Evitar el Calor: Evita saunas, jacuzzis y actividades que generen calor en las áreas 
tratadas durante 48 horas después del tratamiento. 
4. No Exfoliantes Fuertes: Evita el uso de exfoliantes y productos irritantes en la piel 
durante al menos una semana. 
5. Seguimiento: Asiste a las citas de seguimiento programadas para evaluar la 
eficacia del tratamiento y ajustar el plan si es necesario. 
Consideraciones Finales 
Disfruta de una piel suave y libre de vello con la depilación láser diodo en Be Aesthetic RD. 
Te invitamos a agendar una consulta personalizada con nuestros profesionales, quienes te 
guiarán en el proceso y diseñarán un plan de tratamiento adaptado a tus necesidades. 
¡No esperes más para eliminar el vello no deseado de manera efectiva y duradera! 
 
CATEGORIA: GINECOLOGIA ESTETICA`,
    'Depilación Láser Soprano': `Depilación Láser Soprano
Una Solución Definitiva para una Piel Suave y Libre de Vello

Tecnología SHR, apta para todo tipo de piel, con sistema de enfriamiento avanzado para tratamientos cómodos y eficaces.`,
    'Consulta Nutricional': `● Consultas Nutricionales personalizadas 
En Be Aesthetic RD, entendemos que la nutrición es clave para el bienestar integral y la 
estética saludable. Por eso, contamos con un equipo especializado en Nutriología Clínica 
que trabaja contigo para alcanzar tus metas de salud y belleza de manera sostenible y 
personalizada. 
¿Por qué elegir nuestras consultas nutricionales? 
Nuestro enfoque está diseñado para proporcionar un plan alimenticio único que se adapte a 
tus necesidades específicas, teniendo en cuenta tu estilo de vida, objetivos y condiciones de 
salud. Algunas de las razones por las que nuestros pacientes confían en nosotros incluyen: 
● Evaluación completa y personalizada: Incluimos análisis detallados de 
composición corporal, historial médico y preferencias alimenticias. 
● Planes nutricionales adaptados a tus metas: Ya sea que busques pérdida de 
peso, aumento de masa muscular, manejo de condiciones como diabetes o 
simplemente mejorar tu bienestar general, te guiamos paso a paso. 
● Acompañamiento profesional: Nuestro equipo de nutriólogos clínicos está 
altamente capacitado para brindarte un seguimiento cercano y asegurarte resultados 
óptimos. 
● Integración con otros tratamientos: Diseñamos planes que potencian los 
resultados de tratamientos estéticos y corporales que realizas con nosotros, como 
Morpheus8, mesoterapia, entre otros. 
Beneficios de nuestras consultas nutricionales 
● Mejora tu energía y vitalidad. 
● Optimiza el funcionamiento de tu metabolismo. 
● Fortalece tu sistema inmunológico. 
● Potencia los resultados de tratamientos estéticos. 
● Adopta hábitos saludables a largo plazo. 
¿Qué esperar durante tu consulta? 
1. Primera evaluación: Un análisis integral para entender tu punto de partida. 
2. Creación del plan: Elaboramos una estrategia nutricional basada en tus objetivos y 
preferencias. 
3. Seguimiento constante: Monitoreo continuo para ajustar el plan según tu progreso.`,
    'Programa Pérdida de Peso': `Programa de Inhibición de Apetito:  
Transforma tu Relación con la comida y alcanza tus metas 

En Be Aesthetic RD, hemos diseñado un programa integral y personalizado para ayudarte 
a controlar tu apetito y lograr un equilibrio saludable en tu alimentación. Nuestro Programa 
de Inhibición de Apetito combina herramientas científicas y apoyo constante para 
garantizar resultados efectivos y sostenibles. 
¿En qué consiste nuestro programa? 
Este plan único está diseñado para personas que desean manejar el exceso de apetito, 
mejorar sus hábitos alimenticios y alcanzar un peso saludable de forma segura y guiada por 
profesionales. El programa incluye: 
1. Plan Nutricional Personalizado: Diseñamos una dieta equilibrada y ajustada a tus 
necesidades y preferencias, enfocada en mantener la saciedad y potenciar tus 
objetivos. 
2. Farmacología Especializada: Bajo supervisión médica, utilizamos terapias 
farmacológicas seguras y eficaces para el control del apetito, seleccionadas según 
tu caso particular. 
3. Seguimiento Diario: Un acompañamiento cercano y constante, asegurándonos de 
que te sientas apoyado en cada paso del proceso. 
4. Consultas Quincenales: Evaluaciones periódicas para monitorear tu progreso, 
ajustar estrategias y resolver cualquier inquietud. 
5. Duración de 2 Meses: Un enfoque estructurado que te permitirá desarrollar hábitos 
duraderos y alcanzar resultados visibles en un período óptimo. 
Beneficios del Programa de Inhibición de Apetito 
● Control del hambre: Aprende a manejar tu apetito de manera efectiva y sin 
ansiedad. 
● Pérdida de peso saludable: Disminuye el exceso de grasa corporal mientras 
mantienes un equilibrio nutricional. 
● Apoyo continuo: Con el seguimiento de nuestro equipo, nunca estarás solo en tu 
camino. 
● Mejora de hábitos: Adquiere herramientas prácticas que podrás mantener a largo 
plazo. 
● Resultados sostenibles: Diseñamos un plan que se adapta a tu ritmo de vida, sin 
comprometer tu bienestar. 
¿Quiénes pueden beneficiarse? 
Este programa está dirigido a cualquier persona que busque: 
● Reducir el consumo excesivo de alimentos. 
● Mejorar su relación con la comida. 
● Complementar otros tratamientos estéticos o programas de salud. 
● Adoptar un estilo de vida más saludable y sostenible. 
 

NUEVA CATEGORIA: Microcirugias estéticas  
 
Bichectomía:  
Realza tu rostro con naturalidad y elegancia 
En Be Aesthetic RD, transformamos tu imagen con procedimientos que combinan 
precisión, seguridad y resultados naturales. La bichectomía es uno de nuestros 
procedimientos más solicitados, ideal para quienes buscan afinar el rostro y resaltar sus 
facciones sin recurrir a tratamientos invasivos. 
¿Qué es la bichectomía? 
La bichectomía es un procedimiento quirúrgico ambulatorio que consiste en la extracción de 
las bolsas de Bichat, pequeñas acumulaciones de grasa ubicadas en las mejillas. Este 
procedimiento permite afinar el rostro, reduciendo la apariencia de redondez y destacando 
los contornos faciales de manera armónica. 
¿Quiénes son candidatos ideales? 
Este tratamiento es ideal para: 
● Personas con rostro redondeado que desean definir sus facciones. 
● Quienes buscan un procedimiento estético de bajo riesgo y rápida recuperación. 
● Pacientes mayores de 18 años con buen estado de salud general. 
Beneficios de la bichectomía 
● Definición facial: Realza los pómulos y define la mandíbula, logrando un rostro más 
estilizado. 
● Resultados naturales y permanentes: Una vez extraídas, las bolsas de Bichat no 
se regeneran. 
● Procedimiento rápido: La cirugía dura aproximadamente entre 30 y 45 minutos. 
● Recuperación sencilla: Es ambulatoria, con mínimas molestias y un tiempo de 
recuperación corto. 
El Proceso en Be Aesthetic RD 
1. Consulta inicial: Evaluamos tus facciones, expectativas y estado de salud para 
determinar si eres candidato. 
2. Procedimiento: Se realiza bajo anestesia local, asegurando tu comodidad en todo 
momento. 
3. Seguimiento postoperatorio: Nuestro equipo estará contigo en cada paso, 
guiándote para una recuperación óptima. 
¿Qué esperar tras la bichectomía? 

● Ligera inflamación los primeros días, que desaparece rápidamente. 
● Resultados visibles a partir de las primeras semanas y definitivos entre 2-3 meses. 
● Un rostro rejuvenecido y con contornos más definidos. 
Confía tu rostro a los mejores 
En Be Aesthetic RD, nuestro equipo de especialistas realiza la bichectomía con técnicas 
avanzadas, priorizando tu seguridad y satisfacción. Estamos comprometidos a ayudarte a 
resaltar tu belleza natural con resultados elegantes y personalizados.`,
    'Labioplastia Láser': `1. Labioplastia Láser:  
Mejora Tu Confianza 
¿Qué es la Labioplastia Láser?  
La labioplastia láser es un procedimiento estético diseñado para remodelar los labios 
vaginales, ya sea para reducir su tamaño o mejorar su forma. Este tratamiento se realiza 
con tecnología láser, que permite una intervención precisa y mínimamente invasiva, 
ofreciendo resultados estéticos y funcionales. 

Beneficios de la Labioplastia Láser 
● Precisión y Menos Sangrado: El láser permite un corte más preciso, lo que reduce 
el sangrado y mejora la recuperación. 
● Recuperación Rápida: Gracias a su naturaleza mínimamente invasiva, la 
recuperación suele ser más rápida en comparación con técnicas quirúrgicas 
tradicionales. 
● Resultados Estéticos: Mejora la apariencia de los labios vaginales, brindando 
mayor confianza y satisfacción personal. 
● Menor Incomodidad: El uso del láser minimiza el dolor y la incomodidad 
postoperatoria. 
● Efecto Rejuvenecedor: Puede mejorar la elasticidad y firmeza de los tejidos. 
Cuidados Posteriores 
Para asegurar una recuperación adecuada después de la labioplastia láser, sigue estas 
recomendaciones: 
1. Higiene: Mantén la zona tratada limpia y seca. Se recomienda el uso de jabones 
suaves y agua tibia. 
2. Evitar Relaciones Sexuales: Abstente de mantener relaciones sexuales durante al 
menos 4 a 6 semanas después del procedimiento. 
3. No Uso de Productos Irritantes: Evita el uso de productos perfumados o irritantes 
en la zona tratada durante el proceso de recuperación. 
4. Control del Dolor: Puedes utilizar analgésicos recomendados por tu médico para 
manejar cualquier molestia. 
5. Seguimiento: Asiste a las citas de seguimiento programadas para evaluar la 
evolución de la recuperación. 
Tiempo de Resultados 
Los resultados de la labioplastia láser son visibles casi de inmediato, aunque la inflamación 
puede tardar en desaparecer completamente. La mayoría de las pacientes reportan una 
mejora significativa en su apariencia y comodidad dentro de 2 a 4 semanas tras el 
procedimiento. 
Recomendaciones Previas 
Antes de someterte a una labioplastia láser en Be Aesthetic RD, considera lo siguiente: 
● Consulta Médica: Programa una evaluación con nuestros especialistas para discutir 
tus expectativas, historia clínica y determinar si eres una candidata adecuada. 
● Informa Sobre Medicamentos: Asegúrate de informar a tu médico sobre cualquier 
medicamento o suplemento que estés tomando. 
● Evitar Menstruación: Se recomienda programar el procedimiento fuera de tu ciclo 
menstrual para mayor comodidad. 
● Expectativas Realistas: Ten en cuenta que cada cuerpo es diferente y los 
resultados pueden variar según el caso individual. 

Consideraciones Finales 
Recupera tu confianza y bienestar con la labioplastia láser en Be Aesthetic RD. Te invitamos 
a agendar una consulta personalizada con nuestros profesionales, quienes te guiarán en el 
proceso y diseñarán un plan de tratamiento adaptado a tus necesidades. 
¡No esperes más para sentirte cómoda y satisfecha con tu cuerpo!`,
    'Perineoplastia Láser': `9. Perineoplastia Láser 

Mejora Tu Bienestar Íntimo 
¿Qué es la Perineoplastia Láser? 
La perineoplastia láser es un procedimiento estético y reconstructivo que utiliza tecnología 
láser para rejuvenecer y restaurar la elasticidad del perineo, la zona que se encuentra entre 
la vagina y el ano. Este tratamiento puede ayudar a corregir el daño o la laxitud que puede 
ocurrir después del parto, envejecimiento o cambios hormonales. 
¿Para Qué Pacientes se Recomienda Este Procedimiento? 
La perineoplastia láser es recomendada para: 
● Mujeres que han tenido Partos Vaginales: Pacientes que experimentan laxitud en 
el perineo después del parto y buscan mejorar la apariencia y funcionalidad de la 
zona. 
● Incomodidad o Dolor: Aquellas que sienten incomodidad o dolor durante las 
relaciones sexuales debido a cambios en la elasticidad del perineo. 
● Interés en Rejuvenecimiento Íntimo: Mujeres que desean mejorar la estética de su 
área íntima por razones de autoestima o bienestar personal. 
● Problemas de Incontinencia: Pacientes que experimentan incontinencia urinaria 
leve relacionada con el debilitamiento del perineo. 
Beneficios de la Perineoplastia Láser 
● Mejora de la Elasticidad y Tono: Aumenta la elasticidad y el tono del tejido 
perineal, lo que puede resultar en una mejor función sexual y comodidad. 
● Procedimiento No Invasivo: Al ser mínimamente invasivo, el uso del láser reduce 
el tiempo de recuperación y minimiza el riesgo de complicaciones. 
● Resultados Rápidos y Duraderos: Los pacientes suelen notar mejoras 
significativas en la apariencia y funcionalidad en poco tiempo. 
● Poca o Ninguna Disconfort: La técnica láser puede reducir el malestar 
postoperatorio en comparación con los métodos quirúrgicos tradicionales. 
● Recuperación Rápida: La mayoría de las pacientes pueden reanudar sus 
actividades normales en poco tiempo. 
Cuidados Posteriores 
Para asegurar una recuperación adecuada y maximizar los resultados después de la 
perineoplastia láser, sigue estas recomendaciones: 
1. Evitar Relaciones Sexuales: Abstente de mantener relaciones sexuales durante al 
menos 4 a 6 semanas después del procedimiento. 
2. Cuidado de la Zona Tratada: Mantén la zona limpia y evita productos irritantes o 
perfumados. 
3. Monitoreo de Síntomas: Presta atención a cualquier síntoma inusual o reacción 
adversa y comunícalo a tu médico. 

4. Consulta de Seguimiento: Asiste a las citas de seguimiento programadas para 
evaluar la evolución y efectividad del tratamiento. 
Tiempo de Resultados 
Los resultados de la perineoplastia láser son visibles poco después del procedimiento, con 
mejoras continuas en la elasticidad y la apariencia a medida que el tejido se recupera. Los 
efectos pueden durar varios meses, y muchas pacientes optan por sesiones adicionales 
para mantener los resultados. 
Recomendaciones Previas 
Antes de someterte a un procedimiento de perineoplastia láser en Be Aesthetic RD, 
considera lo siguiente: 
● Consulta Médica: Programa una evaluación con nuestros especialistas para discutir 
tus expectativas y determinar si eres una candidata adecuada. 
● Historia Clínica: Informa a tu médico sobre cualquier condición médica 
preexistente, tratamiento previo o medicación que estés tomando. 
● Expectativas Realistas: Es importante tener expectativas realistas sobre los 
resultados y comprender que cada paciente puede experimentar diferentes niveles 
de mejora. 
● Preparación Psicológica: Asegúrate de sentirte cómoda y lista para el 
procedimiento; no dudes en plantear preguntas o inquietudes. 
Consideraciones Finales 
Recupera la confianza en tu bienestar íntimo con la perineoplastia láser en Be Aesthetic RD. 
Te invitamos a agendar una consulta personalizada con nuestros profesionales, quienes te 
guiarán a través del proceso y diseñarán un plan de tratamiento adaptado a tus 
necesidades. 
¡No esperes más para sentirte mejor contigo misma! 
 
SUBCATEGORÍA: MEDICINA CAPILAR  
1. Mesoterapia de Estimulación Capilar con Vitaminas  
¿Qué es la Mesoterapia Capilar? 
La mesoterapia de estimulación capilar con vitaminas es un tratamiento médico no invasivo 
diseñado para combatir la caída del cabello y mejorar su calidad. Consiste en la aplicación 
de microinyecciones superficiales directamente en el cuero cabelludo, donde se introducen 
un cóctel de vitaminas, minerales, aminoácidos y otros nutrientes esenciales que 
promueven el crecimiento capilar. Este procedimiento fortalece los folículos pilosos y 
revitaliza el cabello desde la raíz, estimulando su crecimiento y frenando su caída. 

Beneficios de la Mesoterapia Capilar 
1. Prevención y reducción de la caída del cabello: El tratamiento refuerza los 
folículos capilares debilitados y promueve el crecimiento de nuevo cabello. 
2. Mejora la densidad y el volumen: Al nutrir el cuero cabelludo, el cabello se vuelve 
más grueso, con más cuerpo y volumen. 
3. Reparación y rejuvenecimiento capilar: Las vitaminas y minerales incluidos en el 
tratamiento mejoran la salud del cabello, haciéndolo más fuerte y brillante. 
4. Aumento del flujo sanguíneo en el cuero cabelludo: La mesoterapia ayuda a 
mejorar la microcirculación sanguínea en el área tratada, lo que favorece la 
oxigenación de los folículos pilosos. 
5. Solución personalizada: El cóctel de vitaminas se ajusta según las necesidades 
individuales del paciente, permitiendo tratar distintos tipos de problemas capilares, 
como alopecia androgenética, estrés, desequilibrios hormonales, etc. 
6. Tratamiento mínimamente invasivo: No requiere cirugía y se realiza de forma 
ambulatoria, sin necesidad de largas recuperaciones. 
Procedimiento 
Durante la mesoterapia capilar, el especialista utiliza una aguja fina para administrar las 
vitaminas y nutrientes en la capa media de la piel (mesodermo), donde se encuentran los 
folículos capilares. Se pueden realizar varias sesiones según las necesidades del paciente, 
generalmente espaciadas entre 1 y 4 semanas. 
Cuidados Post Tratamiento 
1. Evitar lavarse el cabello durante las primeras 24-48 horas para permitir que los 
nutrientes penetren correctamente. 
2. No exponerse al sol ni utilizar saunas o baños de vapor en las primeras 48 horas. 
3. No realizar actividad física intensa durante las primeras 24 horas. 
4. Mantener el cuero cabelludo hidratado siguiendo las recomendaciones del 
especialista, utilizando productos capilares específicos y evitando el uso excesivo de 
calor (secadores, planchas). 
5. Seguir una dieta saludable rica en vitaminas y minerales para complementar los 
efectos del tratamiento. 
Resultados Esperados 
Los resultados comienzan a notarse tras varias sesiones, aunque esto puede variar 
dependiendo del estado inicial del cabello y la respuesta de cada paciente al tratamiento. En 
general, se puede observar una reducción significativa en la caída del cabello y un 
incremento en el crecimiento de cabello nuevo en las áreas tratadas. 
Ideal para: 
● Personas que sufren de caída del cabello excesiva. 
● Pacientes con alopecia androgenética o difusa. 
● Aquellos que desean mejorar la calidad y densidad de su cabello. 

● Personas que buscan una solución no quirúrgica para fortalecer su cabello. 
En Be Aesthetic R.D., ofrecemos un enfoque personalizado en la mesoterapia capilar, 
utilizando las últimas innovaciones y productos de alta calidad para asegurar resultados 
óptimos y naturales. ¡Recupera la vitalidad de tu cabello con un tratamiento seguro y eficaz!`,
    'Relleno de Labios Mayores': `5. Relleno de Labios Mayores 
Con Ácido Hialurónico y Realza Tu Belleza Íntima 
¿Qué es el Relleno de Labios Mayores con Ácido Hialurónico? 
El relleno de labios mayores con ácido hialurónico es un procedimiento estético que busca 
aumentar el volumen y mejorar la forma de los labios vaginales externos. Utilizando un gel a 
base de ácido hialurónico, se consigue un aspecto más juvenil, atractivo y saludable en la 
zona íntima. 
¿Para qué pacientes se recomienda este procedimiento? 
El relleno de labios mayores con ácido hialurónico es recomendable para: 
● Mujeres que Buscan Aumentar el Volumen: Aquellas que desean un aumento en 
el volumen de los labios mayores para mejorar la estética y la confianza personal. 
● Pacientes con Pérdida de Volumen: Mujeres que han experimentado pérdida de 
volumen en los labios mayores debido al envejecimiento, cambios hormonales o 
después del parto. 
● Incomodidad por Fricción: Pacientes que experimentan incomodidad o irritación 
debido a la falta de tejido en los labios mayores. 
● Interés en Mejora Estética: Aquellas que desean realzar su apariencia íntima por 
razones estéticas o de bienestar personal. 
Beneficios del Relleno de Labios Mayores 
● Aumento de Volumen: Mejora la apariencia y el volumen de los labios mayores, 
proporcionando un aspecto más juvenil y saludable. 
● Mejoría en la Sensibilidad: Puede aumentar la sensibilidad en la zona, mejorando 
la experiencia sexual. 
● Resultados Inmediatos: Los efectos son visibles de inmediato tras el 
procedimiento. 
● Procedimiento Rápido y Sencillo: La duración de la sesión es corta (30-60 
minutos) y se realiza con anestesia local para mayor comodidad. 
● Efectos Temporales: Permite experimentar cambios estéticos sin compromisos a 
largo plazo, ya que el ácido hialurónico es reabsorbido por el cuerpo con el tiempo. 
Cuidados Posteriores 
Para asegurar una recuperación adecuada y maximizar los resultados después del relleno 
de labios mayores con ácido hialurónico, sigue estas recomendaciones: 
1. Evitar Relaciones Sexuales: Abstente de mantener relaciones sexuales durante al 
menos 1 a 2 semanas después del procedimiento. 
2. Higiene: Mantén la zona tratada limpia y evita productos irritantes o perfumados. 
3. Control de Síntomas: Puede haber algo de hinchazón o moretones en la zona 
tratada, lo cual es normal. Si los síntomas son excesivos, consulta a tu médico. 

4. No Aplicar Calor: Evita saunas, jacuzzis y actividades que generen calor en la zona 
tratada durante los primeros días. 
5. Seguimiento: Asiste a las citas de seguimiento programadas para evaluar la 
evolución y efectividad del tratamiento. 
Tiempo de Resultados 
Los resultados del relleno de labios mayores con ácido hialurónico son visibles de 
inmediato, con una mejora continua en la apariencia en los días siguientes a medida que la 
hinchazón disminuye. Los efectos suelen durar entre 6 a 12 meses, dependiendo de la 
calidad del producto utilizado y la respuesta individual del paciente. 
Recomendaciones Previas 
Antes de someterte a un procedimiento de relleno de labios mayores con ácido hialurónico 
en Be Aesthetic RD, considera lo siguiente: 
● Consulta Médica: Programa una evaluación con nuestros especialistas para discutir 
tus expectativas y determinar si eres una candidata adecuada. 
● Historia Clínica: Informa a tu médico sobre cualquier condición médica, tratamiento 
previo o medicación que estés tomando. 
● Expectativas Realistas: Ten expectativas realistas sobre los resultados y 
comprende que cada paciente puede experimentar diferentes resultados. 
● Preparación Psicológica: Asegúrate de sentirte cómoda y lista para el 
procedimiento; no dudes en plantear preguntas o inquietudes. 
Consideraciones Finales 
Realza tu belleza íntima y mejora tu confianza con el procedimiento de relleno de labios 
mayores con ácido hialurónico en Be Aesthetic RD. Te invitamos a agendar una consulta 
personalizada con nuestros profesionales, quienes te guiarán a través del proceso y 
diseñarán un plan de tratamiento adaptado a tus necesidades. 
¡No esperes más para sentirte mejor contigo misma!`,
    'Aumento de Punto G': `6. Aumento de Punto G 
Mejora Tu Placer Íntimo 
¿Qué es el Aumento de Punto G? 
El aumento de punto G es un procedimiento estético que utiliza ácido hialurónico para 
aumentar y realzar la sensibilidad del punto G, una zona erógena que puede contribuir 
significativamente al placer sexual. Este tratamiento tiene como objetivo mejorar la 
experiencia sexual y la satisfacción íntima al incrementar el volumen y la sensibilidad en 
esta área. 

¿Para Qué Pacientes se Recomienda Este Procedimiento? 
El aumento de punto G es recomendable para: 
● Mujeres que Buscan Aumentar la Sensibilidad: Pacientes que desean mejorar la 
sensibilidad en la zona del punto G para intensificar su placer durante las relaciones 
sexuales. 
● Incomodidad Durante el Sexo: Mujeres que experimentan incomodidad o falta de 
placer en sus relaciones sexuales y desean una solución. 
● Después del Parto: Pacientes que han notado cambios en la sensibilidad o en su 
respuesta sexual después del embarazo o parto. 
● Deseo de Mejorar la Vida Sexual: Aquellas que quieren explorar nuevas 
dimensiones de placer y mejorar su vida sexual. 
Beneficios del Aumento de Punto G 
● Incremento de la Sensibilidad: Mejora la sensibilidad del punto G, lo que puede 
aumentar el placer durante la actividad sexual. 
● Resultados Inmediatos: Los efectos del procedimiento son visibles de inmediato, 
proporcionando una experiencia gratificante. 
● Procedimiento No Invasivo: Al ser mínimamente invasivo y realizarse con ácido 
hialurónico, no requiere cirugía ni largos períodos de recuperación. 
● Duración de los Resultados: Dependiendo del material utilizado, los efectos 
pueden durar entre 6 y 12 meses. 
● Aumento de la Confianza: Mejora la confianza en la intimidad y la satisfacción 
personal. 
Cuidados Posteriores 
Para asegurar una recuperación adecuada y maximizar los resultados después del aumento 
de punto G, sigue estas recomendaciones: 
1. Evitar Relaciones Sexuales: Abstente de mantener relaciones sexuales durante al 
menos 1 a 2 semanas después del procedimiento. 
2. Higiene: Mantén la zona tratada limpia y evita productos irritantes o perfumados. 
3. Control de Síntomas: Puede haber hinchazón o moretones en la zona tratada; esto 
es normal y suele desaparecer en pocos días. 
4. No Aplicar Calor: Evita saunas, jacuzzis y actividades que generen calor en la zona 
tratada durante los primeros días. 
5. Seguimiento: Asiste a las citas de seguimiento programadas para evaluar la 
evolución y efectividad del tratamiento. 
Tiempo de Resultados 
Los resultados del aumento de punto G son visibles de inmediato, aunque la máxima 
sensibilidad se experimenta a medida que el tejido se adapta al tratamiento. Los efectos 
pueden durar entre 6 y 12 meses, dependiendo de la técnica y el material utilizado. 

Recomendaciones Previas 
Antes de someterte a un procedimiento de aumento de punto G en Be Aesthetic RD, 
considera lo siguiente: 
● Consulta Médica: Programa una evaluación con nuestros especialistas para discutir 
tus expectativas y determinar si eres una candidata adecuada. 
● Historia Clínica: Informa a tu médico sobre cualquier condición médica, tratamiento 
previo o medicación que estés tomando. 
● Expectativas Realistas: Ten expectativas realistas sobre los resultados; cada 
paciente puede experimentar diferentes niveles de sensibilidad. 
● Preparación Psicológica: Asegúrate de sentirte cómoda y lista para el 
procedimiento; no dudes en plantear preguntas o inquietudes. 
Consideraciones Finales 
Descubre una nueva dimensión de placer con el procedimiento de aumento de punto G con 
ácido hialurónico en Be Aesthetic RD. Te invitamos a agendar una consulta personalizada 
con nuestros profesionales, quienes te guiarán a través del proceso y diseñarán un plan de 
tratamiento adaptado a tus necesidades. 
¡No esperes más para mejorar tu bienestar íntimo! 
 
7. Pellets de Testosterona 
Equilibra Tu Vitalidad 
¿Qué son los Pellets de Testosterona? 
Los pellets de testosterona son pequeñas cápsulas que se implantan bajo la piel para liberar 
lentamente la hormona testosterona en el organismo. Este tratamiento se utiliza para 
restaurar los niveles hormonales en mujeres y hombres que presentan deficiencias de 
testosterona, mejorando así la salud y el bienestar general. 
¿Para qué pacientes se recomienda este procedimiento? 
Los pellets de testosterona son recomendados para: 
● Mujeres con Síntomas de Deficiencia Hormonal: Pacientes que experimentan 
fatiga, disminución del deseo sexual, cambios de humor o problemas de 
concentración. 
● Hombres con Niveles Bajos de Testosterona: Aquellos que presentan síntomas 
como disminución de la libido, fatiga, pérdida de masa muscular o depresión. 
● Personas que Buscan Mejorar su Calidad de Vida: Aquellos que desean 
recuperar su energía, vitalidad y bienestar general. 

Beneficios de los Pellets de Testosterona 
● Restauración de Niveles Hormonales: Ayuda a equilibrar los niveles de 
testosterona en el cuerpo, aliviando los síntomas de deficiencia hormonal. 
● Aumento de Energía y Vitalidad: Muchos pacientes reportan un aumento 
significativo en la energía y la vitalidad después del tratamiento. 
● Mejora del Deseo Sexual: Puede contribuir a una mayor libido y satisfacción sexual. 
● Incremento de Masa Muscular: Favorece la mejora en la masa muscular y la 
reducción de grasa corporal. 
● Mejor Salud Mental: Puede ayudar a mejorar el estado de ánimo y reducir los 
síntomas de depresión y ansiedad. 
Cuidados Posteriores 
Para asegurar una recuperación adecuada y maximizar los resultados después de la 
implantación de pellets de testosterona, sigue estas recomendaciones: 
1. Evitar Actividad Física Intensa: Abstente de realizar ejercicio intenso durante al 
menos 48 horas después del procedimiento. 
2. Cuidado de la Zona de Implantación: Mantén la zona donde se implantaron los 
pellets limpia y seca. Evita sumergirte en agua (como en piscinas o jacuzzis) durante 
al menos una semana. 
3. Monitoreo de Síntomas: Presta atención a cualquier síntoma inusual o reacción 
adversa y comunícalo a tu médico. 
4. Seguimiento Regular: Asiste a las citas de seguimiento programadas para 
monitorear tus niveles hormonales y ajustar el tratamiento si es necesario. 
Tiempo de Resultados 
Los resultados de los pellets de testosterona suelen comenzar a ser evidentes dentro de 2 a 
4 semanas después de la implantación. La duración de los efectos puede variar, pero 
generalmente los pellets pueden liberar testosterona de manera efectiva durante 3 a 6 
meses. 
Recomendaciones Previas 
Antes de someterte a un procedimiento de pellets de testosterona en Be Aesthetic RD, 
considera lo siguiente: 
● Consulta Médica: Programa una evaluación con nuestros especialistas para discutir 
tus síntomas y determinar si eres una candidata adecuada. 
● Historia Clínica: Informa a tu médico sobre cualquier condición médica 
preexistente, tratamiento previo o medicación que estés tomando. 
● Expectativas Realistas: Es importante tener expectativas realistas sobre los 
resultados y comprender que cada paciente puede experimentar diferentes niveles 
de mejora. 
● Preparación Psicológica: Asegúrate de sentirte cómoda y lista para el 
procedimiento; no dudes en plantear preguntas o inquietudes. 

Consideraciones Finales 
Recupera tu vitalidad y mejora tu calidad de vida con el tratamiento de pellets de 
testosterona en Be Aesthetic RD. Te invitamos a agendar una consulta personalizada con 
nuestros profesionales, quienes te guiarán a través del proceso y diseñarán un plan de 
tratamiento adaptado a tus necesidades. 
¡No esperes más para sentirte mejor contigo mismo! 
 
8. Plasma Rico en Plaquetas Vaginal 
Renueva Tu Salud Íntima 
¿Qué es el Plasma Rico en Plaquetas Vaginal? 
El plasma rico en plaquetas (PRP) vaginal es un tratamiento estético que utiliza las 
propiedades regenerativas de las plaquetas, obtenidas de la sangre del propio paciente. 
Este procedimiento se aplica en la zona vaginal para mejorar la salud íntima, aumentar la 
lubricación y revitalizar los tejidos, promoviendo una mejor función sexual y bienestar 
general. 
¿Para Qué Pacientes se Recomienda Este Procedimiento? 
El tratamiento de PRP vaginal es recomendado para: 
● Mujeres con Sequedad Vaginal: Pacientes que experimentan sequedad vaginal, ya 
sea por factores hormonales, menopausia o tratamientos médicos. 
● Disfunción Sexual: Aquellas que enfrentan dificultades en la excitación o el 
orgasmo y desean mejorar su experiencia sexual. 
● Incontinencia Urinaria Leve: Mujeres que sufren de incontinencia urinaria leve y 
buscan una solución no invasiva. 
● Interés en Mejora Estética: Pacientes que desean rejuvenecer la zona íntima y 
mejorar su autoestima. 
Beneficios del Plasma Rico en Plaquetas Vaginal 
● Estimulación de la Regeneración Celular: Promueve la producción de colágeno y 
elastina, mejorando la elasticidad y firmeza de los tejidos. 
● Aumento de la Lubricación: Ayuda a mejorar la lubricación vaginal, reduciendo la 
incomodidad durante las relaciones sexuales. 
● Mejora de la Sensibilidad: Puede aumentar la sensibilidad en la zona vaginal, 
potenciando el placer sexual. 
● Reducción de Síntomas de Incontinencia: Puede ayudar a fortalecer los tejidos y 
reducir episodios de incontinencia urinaria leve. 
● Resultados Naturales y Duraderos: Al utilizar el propio plasma del paciente, los 
resultados son naturales y se pueden mantener durante varios meses. 

Cuidados Posteriores 
Para asegurar una recuperación adecuada y maximizar los resultados después del 
tratamiento de PRP vaginal, sigue estas recomendaciones: 
1. Evitar Relaciones Sexuales: Abstente de mantener relaciones sexuales durante al 
menos 1 a 2 semanas después del procedimiento. 
2. Higiene: Mantén la zona tratada limpia y evita el uso de productos irritantes o 
perfumados. 
3. Monitoreo de Síntomas: Presta atención a cualquier síntoma inusual o reacción 
adversa y comunícalo a tu médico. 
4. Seguimiento: Asiste a las citas de seguimiento programadas para evaluar la 
evolución y efectividad del tratamiento. 
Tiempo de Resultados 
Los resultados del tratamiento de PRP vaginal pueden comenzar a ser evidentes a partir de 
la segunda o tercera semana, con mejoras continuas durante los siguientes meses. Los 
efectos suelen durar entre 6 meses y un año, dependiendo de cada paciente y su respuesta 
al tratamiento. 
Recomendaciones Previas 
Antes de someterte a un procedimiento de PRP vaginal en Be Aesthetic RD, considera lo 
siguiente: 
● Consulta Médica: Programa una evaluación con nuestros especialistas para discutir 
tus síntomas y determinar si eres una candidata adecuada. 
● Historia Clínica: Informa a tu médico sobre cualquier condición médica 
preexistente, tratamiento previo o medicación que estés tomando. 
● Expectativas Realistas: Es importante tener expectativas realistas sobre los 
resultados y comprender que cada paciente puede experimentar diferentes niveles 
de mejora. 
● Preparación Psicológica: Asegúrate de sentirte cómoda y lista para el 
procedimiento; no dudes en plantear preguntas o inquietudes. 
Consideraciones Finales 
Revitaliza tu salud íntima y mejora tu calidad de vida con el tratamiento de plasma rico en 
plaquetas vaginal en Be Aesthetic RD. Te invitamos a agendar una consulta personalizada 
con nuestros profesionales, quienes te guiarán a través del proceso y diseñarán un plan de 
tratamiento adaptado a tus necesidades. 
¡No esperes más para sentirte mejor contigo misma!`,
    'Tensado Vaginal Láser CO2': `3. Láser CO2 para Tensado Vaginal 
Rejuvenecimiento Íntimo 
¿Qué es el Láser CO2 para Tensado Vaginal? 
El tratamiento con láser CO2 para tensado vaginal es un procedimiento no invasivo que 
utiliza tecnología láser para estimular la regeneración de los tejidos vaginales. Este 
tratamiento está diseñado para mejorar la elasticidad, firmeza y salud general de la zona 
vaginal, abordando problemas como la laxitud vaginal y el envejecimiento. 
Beneficios del Láser CO2 para Tensado Vaginal 

● Rejuvenecimiento de Tejidos: Mejora la elasticidad y firmeza de los tejidos 
vaginales, lo que puede aumentar la satisfacción sexual. 
● Estimulación de Colágeno: Promueve la producción de colágeno, lo que ayuda a 
restaurar la estructura y funcionalidad vaginal. 
● Mejora de la Lubricación: Puede contribuir a aumentar la lubricación natural, 
reduciendo la sequedad vaginal. 
● Resultados Rápidos: Muchos pacientes notan una mejora en la sensación y la 
apariencia en poco tiempo. 
● Procedimiento Seguro: Es un tratamiento seguro, realizado por profesionales 
capacitados, con un mínimo de efectos secundarios. 
Cuidados Posteriores 
Para asegurar una recuperación adecuada y maximizar los resultados después del 
tratamiento con láser CO2 para tensado vaginal, sigue estas recomendaciones: 
1. Higiene: Mantén la zona tratada limpia y seca, utilizando jabones suaves. 
2. Evitar Relaciones Sexuales: Abstente de mantener relaciones sexuales durante al 
menos 2 a 4 semanas después del procedimiento. 
3. No Uso de Productos Irritantes: Evita el uso de productos íntimos que contengan 
fragancias o irritantes durante la recuperación. 
4. Control de Síntomas: Si sientes molestias o tienes alguna preocupación, no dudes 
en contactar a nuestro equipo médico. 
5. Seguimiento: Asiste a las citas de seguimiento programadas para evaluar la 
evolución y efectividad del tratamiento. 
Tiempo de Resultados 
Los resultados del tratamiento con láser CO2 para tensado vaginal suelen ser visibles a 
partir de la primera semana, con mejoras continuas en las semanas siguientes. Los efectos 
pueden durar entre 12 y 18 meses, dependiendo de cada paciente y su respuesta al 
tratamiento. 
Recomendaciones Previas 
Antes de someterte a un tratamiento con láser CO2 para tensado vaginal en Be Aesthetic 
RD, considera lo siguiente: 
● Consulta Médica: Programa una evaluación con nuestros especialistas para discutir 
tus expectativas y determinar si eres una candidata adecuada. 
● Historia Clínica: Informa a tu médico sobre cualquier condición médica, tratamiento 
previo o medicación que estés tomando. 
● Expectativas Realistas: Ten expectativas realistas sobre los resultados; cada 
paciente es única y puede experimentar resultados diferentes. 
● Preparación Psicológica: Asegúrate de sentirte cómoda con el procedimiento y 
plantea cualquier pregunta que puedas tener. 
Consideraciones Finales 

Recupera tu bienestar y confianza con el tratamiento de láser CO2 para tensado vaginal en 
Be Aesthetic RD. Te invitamos a agendar una consulta personalizada con nuestros 
profesionales, quienes te guiarán a través del proceso y diseñarán un plan de tratamiento 
adaptado a tus necesidades. 
¡No esperes más para experimentar los beneficios del rejuvenecimiento vaginal!`,
    'Tensado Vaginal HIFU': `2. HIFU Vaginal 
Rejuvenecimiento y Bienestar Íntimo 
¿Qué es HIFU Vaginal? 
HIFU (High-Intensity Focused Ultrasound) vaginal es un tratamiento no invasivo que utiliza 
ultrasonido focalizado para estimular la producción de colágeno y elastina en la zona 
vaginal. Este procedimiento está diseñado para mejorar la laxitud vaginal, aumentar la 
sensibilidad y ayudar a tratar problemas de incontinencia urinaria, brindando una 
experiencia rejuvenecedora. 
Beneficios del HIFU Vaginal 
● Rejuvenecimiento Vaginal: Mejora la elasticidad y firmeza de los tejidos vaginales, 
lo que puede resultar en una mayor satisfacción sexual. 
● Incontinencia Urinaria: Ayuda a reducir los síntomas de incontinencia urinaria leve, 
mejorando el control de la vejiga. 
● Sin Cirugía: Al ser un tratamiento no invasivo, no requiere anestesia ni tiempo de 
recuperación prolongado. 
● Resultados Duraderos: Los efectos pueden durar de 12 a 24 meses, dependiendo 
de cada paciente y su respuesta al tratamiento. 
● Procedimiento Rápido: La sesión generalmente dura entre 30 y 60 minutos, lo que 
permite una fácil incorporación a la rutina diaria. 
Cuidados Posteriores 
Para asegurar una recuperación adecuada y maximizar los resultados después del 
tratamiento HIFU vaginal, sigue estas recomendaciones: 
1. Higiene: Mantén la zona tratada limpia y seca. Utiliza jabones suaves para evitar 
irritaciones. 
2. Evitar Relaciones Sexuales: Abstente de mantener relaciones sexuales durante al 
menos 1 a 2 semanas después del procedimiento. 
3. No Uso de Productos Irritantes: Evita el uso de productos íntimos irritantes o 
perfumados en las semanas siguientes al tratamiento. 
4. Control de Síntomas: Si experimentas molestias, consulta a nuestro equipo para 
recibir orientación adecuada. 

5. Seguimiento: Asiste a las citas de seguimiento programadas para evaluar la 
efectividad del tratamiento y cualquier ajuste necesario. 
Tiempo de Resultados 
Los resultados del HIFU vaginal son graduales. Muchas pacientes comienzan a notar 
mejoras en la elasticidad y la comodidad vaginal en las semanas siguientes al tratamiento, 
con resultados óptimos que pueden ser evidentes entre 3 a 6 meses a medida que se 
produce colágeno nuevo. 
Recomendaciones Previas 
Antes de someterte a un tratamiento HIFU vaginal en Be Aesthetic RD, considera lo 
siguiente: 
● Consulta Médica: Programa una evaluación con nuestros especialistas para discutir 
tus expectativas y determinar si eres una candidata adecuada. 
● Historial Clínico: Informa a tu médico sobre cualquier condición médica, tratamiento 
previo o medicación que estés tomando. 
● Expectativas Realistas: Es importante tener expectativas realistas sobre los 
resultados y comprender que cada paciente puede experimentar diferentes 
resultados. 
● Preparación Psicológica: Asegúrate de sentirte cómoda y lista para el 
procedimiento, y no dudes en hacer preguntas sobre el tratamiento. 
Consideraciones Finales 
Recupera tu bienestar íntimo y confianza con el tratamiento HIFU vaginal en Be Aesthetic 
RD. Te invitamos a agendar una consulta personalizada con nuestros profesionales, 
quienes te guiarán a través del proceso y diseñarán un plan de tratamiento adaptado a tus 
necesidades. 
¡No esperes más para disfrutar de los beneficios del rejuvenecimiento vaginal!`,
    'Vaporización Cervical': `4. Vaporización Cervical Láser 
Salud y Bienestar Íntimo 
¿Qué es la Vaporización Cervical Láser? 
La vaporización cervical láser es un procedimiento médico que utiliza tecnología láser para 
tratar diversas condiciones del cuello uterino, como lesiones precoces, anomalías o tejido 
cervical anormal. Este tratamiento es mínimamente invasivo y se realiza bajo condiciones 
controladas, promoviendo la salud cervical y el bienestar general de la paciente. 
¿Para qué pacientes se recomienda este procedimiento? 
La vaporización cervical láser es adecuada para: 
● Mujeres con Lesiones Precoces: Pacientes que presentan displasias cervicales o 
cambios precoces en las células del cuello uterino que necesitan tratamiento. 
● Anomalías en Pruebas de Papanicolaou: Mujeres cuyos resultados de 
Papanicolaou han indicado células anormales y requieren un tratamiento para evitar 
el desarrollo de cáncer cervical. 
● Condiciones de VPH: Pacientes que han sido diagnosticadas con infecciones por 
virus del papiloma humano (VPH) y que presentan lesiones cervicales asociadas. 
● Síntomas como Sangrado Irregular: Mujeres que experimentan sangrado vaginal 
anormal o irregularidades en su ciclo menstrual debido a problemas cervicales. 
Beneficios de la Vaporización Cervical Láser 
● Precisión y Eficacia: El láser permite una eliminación precisa del tejido anormal sin 
dañar las estructuras circundantes. 
● Recuperación Rápida: Al ser un procedimiento mínimamente invasivo, la 
recuperación suele ser más rápida en comparación con técnicas más agresivas. 
● Menos Sangrado: La coagulación inmediata del tejido con láser reduce el riesgo de 
sangrado durante y después del procedimiento. 
● Resultados Duraderos: Mejora la salud cervical y puede reducir el riesgo de 
desarrollar condiciones más graves en el futuro. 
● Conservación de Tejido Saludable: Permite preservar el tejido sano, minimizando 
complicaciones y efectos secundarios. 
Cuidados Posteriores 

Para asegurar una recuperación adecuada y maximizar los resultados después de la 
vaporización cervical láser, sigue estas recomendaciones: 
1. Higiene: Mantén la zona tratada limpia. Utiliza jabones suaves y evita productos 
irritantes. 
2. Evitar Relaciones Sexuales: Abstente de mantener relaciones sexuales durante al 
menos 2 a 4 semanas después del procedimiento para permitir la curación 
adecuada. 
3. Control de Síntomas: Es normal experimentar algo de sangrado leve o secreción. 
Si los síntomas son excesivos o preocupantes, consulta a tu médico. 
4. No Uso de Tampones: Evita el uso de tampones y duchas vaginales durante al 
menos 2 semanas. 
5. Seguimiento: Asiste a las citas de seguimiento programadas para evaluar la 
recuperación y la efectividad del tratamiento. 
Tiempo de Resultados 
Los resultados de la vaporización cervical láser pueden ser evidentes casi de inmediato. Sin 
embargo, la curación completa del tejido tratado puede tomar de 4 a 6 semanas. Los 
controles médicos regulares ayudarán a monitorear la salud cervical y asegurar que el 
tratamiento haya sido eficaz. 
Recomendaciones Previas 
Antes de someterte a un procedimiento de vaporización cervical láser en Be Aesthetic RD, 
considera lo siguiente: 
● Consulta Médica: Programa una evaluación con nuestros especialistas para discutir 
tus expectativas y determinar si eres una candidata adecuada. 
● Historia Clínica: Informa a tu médico sobre cualquier condición médica, tratamiento 
previo o medicación que estés tomando. 
● Expectativas Realistas: Es importante tener expectativas realistas sobre los 
resultados y comprender que cada paciente puede experimentar diferentes 
resultados. 
● Preparación Psicológica: Asegúrate de sentirte cómoda y lista para el 
procedimiento; no dudes en plantear preguntas o inquietudes. 
Consideraciones Finales 
Mejora tu salud cervical y bienestar íntimo con el procedimiento de vaporización cervical 
láser en Be Aesthetic RD. Te invitamos a agendar una consulta personalizada con nuestros 
profesionales, quienes te guiarán a través del proceso y diseñarán un plan de tratamiento 
adaptado a tus necesidades. 
¡No esperes más para cuidar de tu salud y bienestar!`,
    'Chip de la Juventud': `Pellets de Testosterona
Equilibra Tu Vitalidad

Implantes subcutáneos que liberan testosterona de forma gradual para mejorar energía, vitalidad y bienestar hormonal.`,
    'Mesoterapia Capilar': `2. Mesoterapia Capilar con Plasma Rico en Plaquetas (PRP)  
¿Qué es la Mesoterapia Capilar con Plasma Rico en Plaquetas (PRP)? 
La mesoterapia capilar con plasma rico en plaquetas (PRP) es un tratamiento regenerativo 
avanzado que utiliza los propios factores de crecimiento del paciente para estimular los 
folículos capilares y promover el crecimiento del cabello. El procedimiento consiste en 
extraer una pequeña cantidad de sangre del paciente, procesarla para concentrar las 
plaquetas y luego inyectar el plasma enriquecido en las áreas del cuero cabelludo afectadas 
por la caída del cabello o debilitamiento capilar. 
Beneficios de la Mesoterapia Capilar con PRP 
1. Estimulación natural del crecimiento capilar: Las plaquetas contienen factores de 
crecimiento que activan los folículos pilosos dormidos, promoviendo el crecimiento 
de cabello nuevo. 
2. Fortalecimiento de la raíz del cabello: El PRP ayuda a revitalizar los folículos 
capilares debilitados, mejorando la densidad y el grosor del cabello. 
3. Aumento del volumen y la textura del cabello: El tratamiento puede mejorar la 
calidad del cabello, haciéndolo más fuerte, suave y con más cuerpo. 
4. Mejora la circulación sanguínea: El PRP incrementa el flujo de sangre en el cuero 
cabelludo, lo que favorece la oxigenación de los folículos y mejora su salud. 
5. Tratamiento personalizado: Dado que el plasma proviene del propio cuerpo del 
paciente, es 100% biocompatible y libre de riesgos de reacciones alérgicas o 
rechazos. 
6. Mínimamente invasivo: El tratamiento es seguro y no quirúrgico, lo que permite una 
recuperación rápida y mínima molestia. 
Procedimiento 
1. Extracción de sangre: Se toma una pequeña muestra de sangre del paciente. 
2. Centrifugado: La sangre es procesada en una centrífuga para separar el plasma 
rico en plaquetas. 
3. Aplicación del PRP: El plasma enriquecido se inyecta directamente en el cuero 
cabelludo, en las zonas afectadas por la caída o debilitamiento del cabello. 
4. Sesiones recomendadas: Normalmente, se realizan entre 3 y 6 sesiones, 
dependiendo del grado de alopecia o pérdida capilar del paciente, con un intervalo 
de 3 a 4 semanas entre cada sesión. 
Cuidados Post Tratamiento 

1. Evitar lavar el cabello durante las primeras 24 horas tras el tratamiento. 
2. No exponerse al sol o calor extremo durante los primeros 2 a 3 días, para evitar 
irritación en el cuero cabelludo. 
3. Evitar productos químicos agresivos como tintes o permanentes por al menos 
una semana después del tratamiento. 
4. No realizar ejercicio intenso ni actividades que puedan generar sudoración 
excesiva en las primeras 24 horas. 
5. Seguir las indicaciones del especialista sobre el uso de productos capilares 
adecuados que potencien los resultados. 
Resultados Esperados 
Los resultados del PRP no son inmediatos, ya que el crecimiento del cabello ocurre de 
manera gradual. Generalmente, los pacientes comienzan a notar mejoras en la densidad y 
calidad del cabello después de las primeras sesiones, con resultados más visibles entre 3 y 
6 meses. La mesoterapia con PRP no solo frena la caída del cabello, sino que promueve el 
crecimiento de nuevos cabellos, mejorando notablemente el aspecto general del cuero 
cabelludo. 
Ideal para: 
● Personas con caída del cabello moderada a severa. 
● Pacientes con alopecia androgenética, alopecia difusa o problemas de 
adelgazamiento del cabello. 
● Aquellos que buscan un tratamiento natural, sin riesgos, utilizando su propio plasma. 
● Personas que deseen mejorar la calidad de su cabello y frenar el envejecimiento 
capilar. 
En Be Aesthetic R.D., nos especializamos en la mesoterapia capilar con PRP, ofreciendo un 
enfoque personalizado para tratar la caída del cabello. Con este tratamiento natural y 
efectivo, ayudamos a nuestros pacientes a recuperar la vitalidad y el crecimiento saludable 
de su cabello.`,
    'Alta Frecuencia Capilar': `3. Alta Frecuencia para Estimulación Capilar  
¿Qué es la Alta Frecuencia para Estimulación Capilar? 
La alta frecuencia es una técnica no invasiva que utiliza corrientes eléctricas suaves para 
estimular el cuero cabelludo, mejorando la circulación sanguínea y oxigenando los folículos 
pilosos. Este tratamiento es ideal para fortalecer el cabello, prevenir su caída y promover su 
crecimiento, ya que ayuda a reactivar los folículos inactivos y a mejorar la salud capilar en 
general. 
Beneficios de la Alta Frecuencia para el Cabello 

1. Estimulación de la circulación sanguínea: La corriente eléctrica de alta frecuencia 
mejora el flujo sanguíneo en el cuero cabelludo, lo que favorece la oxigenación y 
nutrición de los folículos pilosos. 
2. Promoción del crecimiento capilar: El aumento de la oxigenación y los nutrientes 
en los folículos estimula el crecimiento de nuevo cabello. 
3. Fortalecimiento del cabello existente: La alta frecuencia ayuda a revitalizar los 
folículos pilosos, fortaleciendo el cabello desde la raíz, lo que lo hace más fuerte y 
menos propenso a quebrarse. 
4. Prevención de la caída del cabello: Al mejorar la salud del cuero cabelludo y los 
folículos pilosos, el tratamiento reduce la caída excesiva del cabello. 
5. Eliminación de bacterias y toxinas: El efecto antibacteriano del tratamiento ayuda 
a combatir infecciones en el cuero cabelludo, como la caspa, y mantiene un 
ambiente saludable para el crecimiento capilar. 
6. Reducción de la grasa capilar: Ayuda a controlar la producción excesiva de sebo, 
evitando que los folículos pilosos se bloqueen y contribuyan a la caída del cabello. 
Procedimiento 
El tratamiento de alta frecuencia para el cabello se realiza utilizando un electrodo de vidrio 
en forma de peine, que emite corrientes suaves a través del cuero cabelludo. Estas 
corrientes eléctricas generan una sensación de hormigueo que no causa dolor. El 
procedimiento es rápido y no invasivo, con sesiones que duran aproximadamente entre 15 y 
30 minutos, dependiendo de las necesidades del paciente. 
Cuidados Post Tratamiento 
1. Evitar lavar el cabello durante las primeras 24 horas para permitir que los 
beneficios del tratamiento se asienten en el cuero cabelludo. 
2. Hidratar el cabello utilizando productos recomendados por el especialista, ya que el 
tratamiento puede resecar ligeramente el cuero cabelludo. 
3. No utilizar productos químicos agresivos como tintes o tratamientos alisadores 
durante los primeros días tras el tratamiento. 
4. Seguir una rutina capilar adecuada para mantener el cuero cabelludo limpio y libre 
de impurezas que puedan obstruir los folículos. 
5. Realizar sesiones periódicas según lo recomendado para mantener y potenciar los 
resultados. 
Resultados Esperados 
Los resultados de la alta frecuencia para el cabello son progresivos y se vuelven más 
evidentes con el tiempo. Tras varias sesiones, los pacientes notan una disminución en la 
caída del cabello, un aumento en el crecimiento capilar y una mejora general en la textura y 
salud del cuero cabelludo. La frecuencia de las sesiones dependerá de la gravedad del 
problema capilar y los objetivos individuales. 
Ideal para: 
● Personas con problemas de caída del cabello. 

● Pacientes con cuero cabelludo graso o propenso a la caspa. 
● Aquellos que deseen fortalecer su cabello y mejorar su salud capilar. 
● Personas con folículos pilosos inactivos que buscan estimular el crecimiento de 
nuevo cabello. 
En Be Aesthetic R.D., combinamos la alta frecuencia con otros tratamientos capilares 
avanzados para ofrecer una solución integral a los problemas de caída y debilitamiento 
capilar. ¡Recupera la vitalidad y salud de tu cabello con un tratamiento seguro, efectivo y sin 
cirugía! 
 
CATEGORÍA: CONTACTANOS  
 
● SANTO DOMINGO:  
C.Lic. Carlos Sanchez #15 esq. Av. Tiradentes, Naco.  
Teléfono: +1 (849) 392-5555 
Whatsapp: 809-639-2490  
Correo:  
Agregar location  
Agregar video de la sucursal  
 
● SANTIAGO:  
Av. Miraflores #30, Los Alamos.  
Teléfono: +1 (829) 285-9105 
Whatsapp: 809-639-2490  
Correo:  
Agregar location  
Agregar video de la sucursal  
 
● PUNTA CANA:  
Av. Alemania esq. c. Cuba, Los Corales, Bávaro, Punta Cana. Plaza Paseo del Mar.  

Whatsapp: 809-639-2490 
Correo:  
Agregar location  
Agregar video de la sucursal  
 
 
 
Categoria: Depilacion laser  
 
Depilación Láser Soprano:  
Una Solución Definitiva para una Piel Suave y Libre de Vello 
En Be Aesthetic RD, transformamos tu experiencia de depilación con la tecnología más 
avanzada: Láser Soprano, un método líder en el mercado reconocido por su eficacia, 
seguridad y comodidad. Diseñado para adaptarse a todos los tipos de piel, incluyendo 
pieles bronceadas, este tratamiento es la elección perfecta para quienes buscan una 
solución duradera y prácticamente indolora. 
¿Qué hace único al Láser Soprano? 
● Tecnología SHR (Super Hair Removal): Combina energía de láser con tecnología 
de calentamiento gradual para garantizar una eliminación del vello suave y efectiva. 
● Apto para todo tipo de piel: Ya sea clara, morena o bronceada, el láser Soprano 
trabaja eficazmente en cada tono. 
● Indoloro: Su sistema de enfriamiento avanzado protege la piel, haciéndolo cómodo 
incluso en las zonas más sensibles. 
● Rápido y práctico: Tratamientos cortos, ideales para adaptarse a tu estilo de vida 
ocupado. 
Beneficios de la Depilación Láser Soprano 
● Eliminación progresiva y duradera del vello. 
● Resultados visibles desde las primeras sesiones. 
● Ahorro de tiempo y dinero al reducir la necesidad de métodos tradicionales como el 
rasurado o la cera. 
● Mejora la textura de la piel, dejándola suave y libre de irritaciones. 
 
NUEVA CATEGORIA: Pérdida de peso`,
    'Lipopapada': `Lipopapada:  
Define tu perfil con elegancia y precisión 
En Be Aesthetic RD, transformamos tu imagen con tratamientos personalizados y 
mínimamente invasivos. La lipopapada es una solución efectiva para quienes desean 
eliminar la grasa acumulada bajo el mentón, definiendo el contorno facial y mejorando su 
perfil de manera rápida y segura. 
¿Qué es la lipopapada? 
La lipopapada es un procedimiento ambulatorio que consiste en la eliminación de grasa 
localizada en la zona del cuello y debajo del mentón. Este tratamiento redefine el contorno 
mandibular, logrando una apariencia más estilizada y juvenil. 
¿Quiénes son candidatos ideales? 
Este procedimiento está indicado para: 
● Personas con acumulación de grasa bajo el mentón que desean un perfil más 
definido. 
● Pacientes con piel elástica que pueda adaptarse a los cambios tras la eliminación de 
grasa. 
● Hombres y mujeres que buscan resultados efectivos sin recurrir a cirugías mayores. 
Beneficios de la lipopapada 
● Definición facial inmediata: Mejora el contorno del rostro y realza la línea 
mandibular. 
● Procedimiento ambulatorio: Es rápido, con una duración promedio de 45 minutos 
a 1 hora. 

● Resultados visibles y duraderos: Eliminamos la grasa acumulada de forma 
permanente. 
● Mínima invasión y recuperación rápida: Ideal para quienes desean retomar sus 
actividades cotidianas en poco tiempo. 
El Proceso en Be Aesthetic RD 
1. Consulta personalizada: Evaluamos tu caso, tus expectativas y la condición de tu 
piel para asegurarnos de que este procedimiento sea adecuado para ti. 
2. Procedimiento: Bajo anestesia local, realizamos pequeñas incisiones para aspirar 
la grasa de manera precisa y segura. 
3. Seguimiento postoperatorio: Te proporcionamos cuidados y orientación para 
garantizar una recuperación óptima y resultados espectaculares. 
¿Qué esperar tras la lipopapada? 
● Inflamación mínima: Puede presentarse en los primeros días, pero disminuye 
rápidamente con los cuidados indicados. 
● Resultados iniciales inmediatos: Notarás mejoras visibles desde las primeras 
semanas, con resultados definitivos en aproximadamente 2 meses. 
● Una apariencia más definida: Lograrás un rostro rejuvenecido y estilizado.`,
    'Alectomía': `Alectomía:  
Perfecciona la forma de tu nariz  
En Be Aesthetic RD, ofrecemos procedimientos estéticos diseñados para realzar tu belleza 
natural y armonizar tus facciones. La alectomía es una técnica quirúrgica mínimamente 
invasiva ideal para quienes desean reducir el ancho de las fosas nasales y mejorar la 
apariencia de su nariz de manera sutil pero efectiva. 
¿Qué es la alectomía? 
La alectomía es un procedimiento quirúrgico ambulatorio que consiste en la reducción del 
ancho de las alas nasales (aletas de la nariz). Este tratamiento es ideal para afinar la nariz, 
logrando un resultado equilibrado y proporcional al resto del rostro, sin alterar su 
funcionalidad ni su estructura principal. 
¿Quiénes son candidatos ideales? 
La alectomía está dirigida a: 

● Personas que consideran que sus fosas nasales son demasiado anchas o 
prominentes. 
● Pacientes que desean una mejora estética sin someterse a una rinoplastia completa. 
● Hombres y mujeres mayores de 18 años con expectativas realistas y buen estado de 
salud general. 
● Aquellos que buscan un procedimiento rápido, seguro y con resultados visibles en 
poco tiempo. 
Beneficios de la alectomía 
● Resultados naturales y armónicos: Mejora la apariencia de tu nariz respetando tus 
rasgos únicos. 
● Procedimiento rápido: Se realiza en menos de 1 hora y es completamente 
ambulatorio. 
● Cicatrices casi invisibles: Las incisiones se realizan en pliegues naturales, lo que 
las hace imperceptibles. 
● Mejora inmediata: Notarás cambios en la forma de tu nariz desde los primeros días. 
● Recuperación sencilla: Ideal para quienes buscan un tratamiento estético sin 
largos periodos de inactividad. 
El Proceso en Be Aesthetic RD 
1. Consulta inicial: Analizamos la estructura de tu nariz y tus objetivos para planificar 
el procedimiento adecuado. 
2. Procedimiento: Bajo anestesia local, realizamos pequeñas incisiones en las alas 
nasales para reducir su tamaño de manera precisa. 
3. Seguimiento postoperatorio: Supervisamos tu recuperación para garantizar 
resultados óptimos y duraderos. 
¿Qué esperar tras la alectomía? 
● Recuperación rápida: Ligera inflamación y molestias temporales que desaparecen 
en pocos días. 
● Resultados inmediatos: Una nariz más estilizada y proporcional al rostro desde las 
primeras semanas. 
● Cicatrices mínimas: Invisibles a simple vista, ubicadas estratégicamente para 
garantizar discreción.`,
    'Lobuloplastia': `Lobuloplastia:  
Corrige y restaura la belleza de tus orejas 
En Be Aesthetic RD, ofrecemos soluciones estéticas y reconstructivas para mejorar tu 
confianza y bienestar. La lobuloplastia es un procedimiento quirúrgico mínimamente 
invasivo diseñado para reparar y restaurar el lóbulo de la oreja, ya sea por rasgaduras, 
dilataciones o deformidades. Este tratamiento es ideal para devolver a tus orejas una 
apariencia natural y armoniosa. 

¿Qué es la lobuloplastia? 
La lobuloplastia es una cirugía ambulatoria que repara los lóbulos de las orejas dañados 
debido a: 
● Rasgaduras parciales o completas por el uso de aretes pesados o accidentes. 
● Dilataciones excesivas provocadas por piercings o expansores. 
● Deformidades congénitas o adquiridas que afectan la estética del lóbulo. 
¿Quiénes son candidatos ideales? 
Este procedimiento está dirigido a: 
● Personas que desean reparar lóbulos rasgados o alargados. 
● Pacientes con dilataciones que desean cerrar los agujeros y restaurar la forma 
original del lóbulo. 
● Hombres y mujeres que buscan un procedimiento rápido, seguro y con resultados 
naturales. 
● Aquellos interesados en volver a usar aretes después de una reparación adecuada. 
Beneficios de la lobuloplastia 
● Corrección estética: Devuelve la forma natural y simétrica a los lóbulos de las 
orejas. 
● Resultados discretos: Las cicatrices son mínimas y se disimulan fácilmente con el 
tiempo. 
● Procedimiento rápido: Se realiza en consultorio en aproximadamente 30 a 60 
minutos. 
● Recuperación sencilla: Ideal para quienes buscan una solución efectiva sin largos 
periodos de inactividad. 
● Opción de re-perforación: Después de la recuperación, puedes volver a perforarte 
las orejas si lo deseas. 
El Proceso en Be Aesthetic RD 
1. Consulta inicial: Evaluamos el estado de tus lóbulos y discutimos tus expectativas 
para planificar el procedimiento ideal. 
2. Procedimiento: Bajo anestesia local, realizamos pequeñas incisiones y suturas 
para restaurar la forma natural del lóbulo. 
3. Seguimiento postoperatorio: Te guiamos durante el proceso de recuperación para 
garantizar resultados impecables. 
¿Qué esperar tras la lobuloplastia? 
● Recuperación rápida: Inflamación mínima y molestias leves que desaparecen en 
pocos días. 
● Resultados visibles: Una vez que el área se recupera, notarás una mejora 
inmediata en la forma y simetría del lóbulo. 

● Re-perforación segura: Tras la completa cicatrización (generalmente en 6-8 
semanas), puedes volver a perforarte si lo deseas. 
 
CATEGORÍA: SUEROTERAPIA`,
    'Blefaroplastia': `Blefaroplastia:  
Renueva tu mirada y rejuvenece tu rostro 
En Be Aesthetic RD, ofrecemos procedimientos que resaltan tu belleza natural, como la 
blefaroplastia, una técnica quirúrgica diseñada para rejuvenecer la zona de los ojos, 
eliminando el exceso de piel, grasa o bolsas en los párpados. Si deseas una mirada más 
fresca y descansada, este tratamiento es la solución ideal. 
¿Qué es la blefaroplastia? 
La blefaroplastia es una cirugía ambulatoria que mejora la apariencia de los párpados 
superiores e inferiores. Este procedimiento puede eliminar la flacidez, las bolsas de grasa y 
el exceso de piel, devolviendo a tus ojos un aspecto rejuvenecido y descansado. 
¿Quiénes son candidatos ideales? 
La blefaroplastia está indicada para: 
● Personas con exceso de piel en los párpados superiores que afecta su apariencia o 
visión. 
● Quienes presentan bolsas de grasa debajo de los ojos, dando una apariencia de 
cansancio. 
● Hombres y mujeres que desean rejuvenecer su mirada de forma natural y discreta. 
● Pacientes con buena salud general y expectativas realistas sobre los resultados. 

Beneficios de la blefaroplastia 
● Rejuvenecimiento facial: Una mirada más joven y descansada que mejora todo el 
rostro. 
● Resultados duraderos: Disfruta de los beneficios durante años, con una mejora 
visible desde el primer momento. 
● Mejor calidad visual: En algunos casos, la eliminación del exceso de piel mejora el 
campo visual. 
● Procedimiento ambulatorio: Realizado en consultorio, con recuperación rápida y 
mínimamente invasiva. 
El Proceso en Be Aesthetic RD 
1. Consulta personalizada: Evaluamos la estructura de tus párpados y tus 
necesidades para planificar el procedimiento ideal. 
2. Procedimiento: Realizado bajo anestesia local, eliminamos el exceso de piel y 
grasa con técnicas precisas y cuidadosas. 
3. Cuidado postoperatorio: Seguimiento cercano para garantizar una recuperación 
óptima y resultados impecables. 
¿Qué esperar tras la blefaroplastia? 
● Recuperación rápida: Ligera inflamación y hematomas en los primeros días, que 
desaparecen con el tiempo. 
● Resultados visibles pronto: Una mirada renovada y fresca que se consolida en las 
semanas siguientes. 
● Discreción: Las incisiones se realizan en zonas estratégicas, dejando cicatrices casi 
imperceptibles.`,
    'Sueroterapia Complex': `1. Sueroterapia Complex 
La Sueroterapia Complex es un tratamiento intravenoso diseñado para revitalizar el 
organismo desde el interior, aportando una combinación de glutatión, vitamina C, vitaminas 
B12, B6, biotina y antioxidantes, esenciales para el bienestar general y la salud de la piel. 
Esta terapia ayuda a fortalecer el sistema inmune, mejorar los niveles de energía, apoyar 
los procesos de desintoxicación, favorecer la salud de la piel, cabello y uñas, y combatir el 
estrés oxidativo de forma eficaz y segura. 
En Be Aesthetic R.D., la sueroterapia se aplica bajo supervisión médica, adaptada a las 
necesidades de cada paciente, ofreciendo una experiencia de bienestar integral. 
 
 Beneficios principales: 
● Refuerza el sistema inmunológico 
 
● Aumenta energía y vitalidad 
 
● Potente acción antioxidante 
 
● Mejora la calidad de la piel, cabello y uñas 
 
● Apoya procesos de desintoxicación`,
    'Sueroterapia NAD+': `2. Sueroterapia NAD+  
La Sueroterapia NAD+ es un tratamiento intravenoso avanzado enfocado en la 
regeneración celular y el bienestar integral, ideal para apoyar los procesos de antiaging, 
energía y salud metabólica. El NAD+ (Nicotinamida Adenina Dinucleótido) es una 
coenzima esencial para la producción de energía celular y la reparación del ADN. 
Esta terapia ayuda a mejorar la vitalidad, la concentración mental, el rendimiento físico 
y la salud celular, además de apoyar la desintoxicación y el envejecimiento saludable. 
En Be Aesthetic R.D., la sueroterapia NAD+ se administra bajo supervisión médica, de 
forma segura y personalizada según las necesidades de cada paciente. 
 

 Beneficios principales: 
● Aumenta energía y resistencia física 
 
● Apoya la regeneración celular 
 
● Mejora la claridad mental y la concentración 
 
● Contribuye al envejecimiento saludable 
 
● Favorece la desintoxicación celular 
CATEGORÍA:  ENDOLASER`,
    'Endolifting Corporal': `1. Endolaser Corporal  
El Endoláser Corporal es un tratamiento avanzado de moldeado corporal no quirúrgico que 
utiliza energía láser para reducir grasa localizada, mejorar la flacidez y estimular la 
producción de colágeno, logrando una piel más firme y un contorno corporal definido. 
Este procedimiento actúa directamente sobre el tejido adiposo, favoreciendo la eliminación 
natural de grasa y la retracción de la piel. Es ideal para tratar zonas como abdomen, brazos, 
muslos, flancos y espalda, con resultados progresivos y naturales. 
En Be Aesthetic R.D., el Endoláser Corporal es realizado por médicos, utilizando técnicas 
especializadas y protocolos personalizados para garantizar seguridad y resultados óptimos. 
 Proceso post tratamiento 
Para optimizar los resultados, se recomienda realizar sesiones de drenaje linfático y el uso 
de faja compresiva durante el tiempo indicado por el médico tratante, ayudando a disminuir 
inflamación, favorecer la recuperación y mejorar el contorno final. 
 
 Beneficios principales: 
● Reduce grasa localizada 
 
● Mejora la flacidez y firmeza de la piel 
 
● Estimula colágeno 
 
● Define el contorno corporal 
 
● Procedimiento mínimamente invasivo`,
    'Endolifting Facial': `2. Endolifting facial  
El Endolifting Facial es un tratamiento avanzado de rejuvenecimiento facial no quirúrgico 
que utiliza energía láser para reafirmar la piel, redefinir contornos y estimular la producción 
de colágeno, logrando un efecto lifting natural y progresivo. 
Este procedimiento actúa en las capas profundas de la piel, mejorando la flacidez, la calidad 
cutánea y el soporte facial, sin alterar la expresión natural del rostro. Es ideal para tratar 
zonas como papada, línea mandibular, mejillas, surcos y contorno facial, con resultados 
visibles y duraderos. 
En Be Aesthetic R.D., el Endolifting Facial es realizado directamente por médicos, mediante 
técnicas especializadas y protocolos personalizados que garantizan seguridad y resultados 
armónicos. 
 Proceso post tratamiento 
Tras el procedimiento puede presentarse inflamación leve o enrojecimiento temporal, por lo 
que se indican cuidados específicos según cada caso. No requiere reposo prolongado y 
permite una reincorporación rápida a las actividades diarias, siguiendo las indicaciones 
médicas. 
 
 Beneficios principales: 
● Reafirma y tensa la piel del rostro 
 
● Estimula colágeno y elastina 
 
● Mejora la flacidez facial y papada 
 
● Redefine el contorno facial 
 
● Resultados progresivos y naturales 
 
● Procedimiento mínimamente invasivo`,
    'Hilos de Colágeno': `Hilos de Colágeno

Los hilos de colágeno son un tratamiento innovador de rejuvenecimiento que permite mejorar la firmeza, textura y calidad de la piel mediante la estimulación natural de colágeno. Estos hilos, biocompatibles y reabsorbibles, se colocan de forma superficial para activar los procesos regenerativos de la piel, ayudando a mejorar la flacidez, suavizar líneas finas y aportar mayor elasticidad.

Este procedimiento actúa desde el interior, promoviendo una renovación progresiva que fortalece la estructura cutánea y mejora visiblemente la apariencia de la piel con resultados naturales. Además de su efecto rejuvenecedor, contribuye a mejorar la luminosidad y tonicidad, siendo ideal para tratar zonas como el rostro, cuello y otras áreas con pérdida de firmeza.`,
    'Microagujas en Rostro': `Microagujas grado médico

Rejuvenecimiento y renovación de la piel

El tratamiento con microagujas, también conocido como microneedling, es una técnica avanzada no invasiva para mejorar la textura y calidad de la piel. Consiste en crear microcanales controlados que activan la regeneración natural y la producción de colágeno.

¿Cómo funciona el microneedling?

Las microlesiones controladas estimulan mecanismos de reparación cutánea y síntesis de colágeno y elastina. Además, favorecen la absorción de activos tópicos, potenciando los resultados.

Beneficios de las microagujas:

Mejora firmeza, elasticidad y textura.
Ayuda a reducir líneas finas y arrugas.
Mejora cicatrices, incluyendo cicatrices de acné.
Disminuye la apariencia de poros dilatados.
Puede apoyar protocolos para estrías en áreas corporales.

¿Para quién está indicado?

Para personas que desean mejorar textura, poros, marcas, líneas finas o signos tempranos de envejecimiento en rostro, cuello, escote y zonas corporales seleccionadas.

Duración del tratamiento y resultados:

Las sesiones suelen durar entre 30 y 60 minutos según el área tratada. La mejoría es progresiva y se potencia con sesiones seriadas según evaluación médica.`,
    'PDRN de Salmón': `PDRN de Salmón

El PDRN de salmón es un tratamiento avanzado de rejuvenecimiento que utiliza polinucleótidos de origen biocompatible para estimular la regeneración celular y mejorar la calidad de la piel desde el interior. Este procedimiento activa los procesos naturales de reparación cutánea, favoreciendo la producción de colágeno, mejorando la elasticidad y restaurando la vitalidad de la piel.

Es especialmente eficaz para mejorar la hidratación, reducir líneas finas, mejorar la textura y devolver luminosidad a la piel, logrando un aspecto más saludable, firme y rejuvenecido. Además, contribuye a fortalecer la piel y mejorar su capacidad de recuperación, siendo ideal para pieles deshidratadas, envejecidas o con signos visibles de daño.

El PDRN de salmón es una excelente opción para quienes buscan un rejuvenecimiento natural y progresivo, sin alterar la expresión facial.`,
    'Reducción de Capuchón del Clítoris con Láser': `Reducción de Capuchón del Clítoris con Láser

La reducción de capuchón con tecnología láser es un procedimiento de ginecología estética diseñado para mejorar la apariencia y funcionalidad de la zona íntima femenina mediante una técnica precisa, segura y mínimamente invasiva. Este tratamiento permite reducir el exceso de tejido que recubre el clítoris, favoreciendo una apariencia más armónica y contribuyendo al bienestar íntimo de la paciente.

El uso de tecnología láser permite trabajar con alta precisión, promoviendo una mejor retracción del tejido, estimulando la producción de colágeno y favoreciendo una recuperación más rápida en comparación con técnicas tradicionales. Además de sus beneficios estéticos, este procedimiento puede contribuir a mejorar la comodidad y la confianza personal.`,
    'Tensado Vaginal Duplex': `Tensado Vaginal Duplex

El tensado vaginal Duplex es un tratamiento avanzado de ginecología estética que utiliza tecnología láser de doble acción para estimular la producción de colágeno y mejorar la firmeza de los tejidos vaginales. Este procedimiento ayuda a restaurar la tonicidad, elasticidad y calidad del tejido, contribuyendo a mejorar la funcionalidad y el bienestar íntimo femenino.

Su tecnología actúa de forma precisa y segura en las capas internas, promoviendo la regeneración natural del tejido y favoreciendo una mayor firmeza y lubricación. Es ideal para mujeres que presentan laxitud vaginal, especialmente después del parto o como consecuencia del proceso natural de envejecimiento, ofreciendo una solución efectiva sin cirugía.`,
    'Fulguración de Verrugas Genitales': `Fulguración de Verrugas Genitales

La fulguración de verrugas genitales es un procedimiento médico seguro y eficaz que permite eliminar lesiones causadas por el virus del papiloma humano (VPH) mediante el uso de tecnología especializada. Este tratamiento actúa de forma precisa sobre las verrugas, eliminándolas sin afectar el tejido sano circundante y favoreciendo una adecuada regeneración de la piel.

Este procedimiento no solo mejora la apariencia estética de la zona íntima, sino que también contribuye al bienestar y la salud íntima, ayudando a prevenir el crecimiento o propagación de las lesiones. Se realiza bajo evaluación médica previa, garantizando un abordaje personalizado según las necesidades de cada paciente.`,
};

const FULL_TEAM_BIOS: Record<string, string> = {
    'Dra. Rosaina De Los Santos Jiménez': `Dra. Rosaina De Los Santos Jiménez es una especialista en ginecología-obstetricia, colposcopía y ginecología estética. Con una amplia experiencia en procedimientos ginecológicos avanzados, incluyendo más de 500 partos vaginales, mil cesáreas y 800 colposcopias, se ha consolidado como una figura destacada en su campo.

Formación Académica:
Doctora en Medicina (UASD), graduada Cum Laude en 2012.
Especialidad en Ginecología y Obstetricia (2014-2018), Hospital Maternidad Nuestra Señora de La Altagracia.
Formación en Ginecología Estética y múltiples actualizaciones relevantes.

Cita personal:
"Mi misión es ofrecer servicios médicos que no solo promuevan la salud femenina, sino que también integren el bienestar estético y el autocuidado, para que cada paciente se sienta cuidada en todas las etapas de su vida."`,
    'Dra. Anyi María Abreu Tavárez': `Doctora en Medicina con formación en ginecología y obstetricia, experiencia clínica, auditoría médica y docencia. Su ejercicio profesional integra la salud femenina con un enfoque preventivo, estético y antiaging, promoviendo el equilibrio hormonal, el bienestar integral y la calidad de vida de la mujer.

Cita personal:
"La verdadera estética comienza con la salud, el equilibrio y el cuidado integral de la mujer."`,
    'Dra. Jismel Ramírez': `Médico especialista en ginecología y obstetricia, con subespecialidad en ginecología oncológica y amplia formación quirúrgica. Combina su experiencia clínica con un enfoque en ginecología estética, funcional y antiaging, orientado a la prevención, el bienestar íntimo y la salud integral de la mujer.

Cita personal:
"Cuidar la salud femenina también es preservar su bienestar, autoestima y calidad de vida."`,
    'Dra. Nathalia Cruz Vásquez': `Médico con máster en Medicina Estética, Anti-Aging y Nutrición, especializada en tratamientos faciales y corporales orientados al rejuvenecimiento integral. Su enfoque combina ciencia, técnica y estética para lograr resultados naturales, seguros y personalizados.

Cita personal:
"El antiaging es cuidar hoy lo que deseas conservar mañana."`,
    'Dra. Katherin Reyes': `Doctora en Medicina con experiencia clínica en urgencias y consulta general, enfocada en medicina estética y bienestar integral. Aplica un enfoque preventivo y antiaging, orientado a mejorar la calidad de la piel, la salud corporal y la confianza del paciente.

Cita personal:
"La estética responsable nace del cuidado médico y el respeto por la naturalidad."`,
    'Dra. Jhanna María Soto Ruiz': `Médico con formación en cirugía general y cirugía plástica reconstructiva, con amplia experiencia académica y quirúrgica. Integra técnicas quirúrgicas y no invasivas con un enfoque estético y antiaging.

Cita personal:
"La estética bien realizada transforma sin perder la esencia de cada persona."`,
    'Dra. Sorimar Espinal Reyes': `La Dra. Sorimar Espinal Reyes es una profesional apasionada por la estomatología y la armonización facial. Graduada en la Pontificia Universidad Católica Madre y Maestra, se ha especializado en el manejo del dolor orofacial y craneomandibular, completando una maestría en la Universidad de Salamanca, España.

Cita personal:
"La armonía facial y la salud bucal no solo reflejan belleza, sino también bienestar y calidad de vida."`,
    'Dra. Perla M. Simón Villegas': `La Dra. Perla M. Simón Villegas es una profesional comprometida con la salud y el bienestar de sus pacientes. Egresada en Medicina por la Universidad Tecnológica de Santiago (UTESA), complementa su formación con un Diplomado en Cosmiatría Avanzada por la UAPA y un Diplomado en Destreza Hospitalarias por CIFMEC.

Cita personal:
"Cada paciente es único, y mi misión es ofrecer un cuidado personalizado, comprometido con su salud y belleza."`,
    'Dra. Sarah Priscila Escaño Estrella': `Anestesióloga y Médico Estético con más de ocho años de experiencia. Graduada en Medicina por la Universidad Autónoma de Santo Domingo, con especialización en Anestesiología y Máster en Medicina Estética y Armonización Facial en Sao Paulo, Brasil.

Cita personal:
"Mi objetivo es que cada paciente logre sentirse más seguro y pleno con su apariencia, brindando resultados naturales y personalizados."`,
    'Dr. Steele Francisco Mejía López': `Médico con especialización en medicina estética, armonización facial, cirugía de trasplante capilar y Endolaser. Con más de 10 años de experiencia en el campo de la salud. Actualmente, es Director Médico de Be Aesthetic, donde supervisa y coordina todos los procedimientos médicos.

Cita personal:
"Creo firmemente en la medicina estética como una forma de realzar la belleza natural, siempre priorizando la salud y el bienestar de mis pacientes. Cada tratamiento es una oportunidad para mejorar la calidad de vida, con resultados que reflejan equilibrio, naturalidad y armonía."`,
    'Dra. Anny Frías': `La Dra. Anny Frías es Médico General, Cirujana General y Cirujana Plástica y Reconstructiva, con una trayectoria de casi dos décadas dedicada al cuidado integral del paciente. Es miembro activo de SODOCIPRE.

Cita personal:
"La cirugía y la medicina estética deben practicarse con responsabilidad, ética y un profundo respeto por la salud y la individualidad de cada paciente."`,
    'Dra. Denisse Marielys Cataño Martínez': `La Dra. Denisse Marielys Cataño Martínez es Doctora en Medicina, con formación complementaria como Nutrióloga Clínica, además de estudios técnicos en enfermería y capacitación en soporte vital.

Cita personal:
"La salud comienza con el cuidado consciente del cuerpo y el compromiso diario con el bienestar."`,
    'Dra. Nixaury María Rodríguez Cuevas': `La Dra. Nixaury María Rodríguez Cuevas es Médico General, egresada de la Universidad Tecnológica de Santiago (UTESA), con experiencia en atención primaria, medicina interna y manejo integral del paciente.

Cita personal:
"La medicina debe ejercerse con empatía, responsabilidad y un verdadero compromiso con el bienestar del paciente."`,
    'Dra. Ana Cordero Ramón': `La Dra. Ana Cordero Ramón es Doctora en Medicina, egresada de la Universidad Autónoma de Santo Domingo (UASD), con Especialidad en Nutriología Clínica del Instituto Tecnológico de Santo Domingo (INTEC). Complementa su formación con diplomados en Diabetología y Obesología, y especialidad en Medicina Estética.

Cita personal:
"La salud se construye con conocimiento, prevención y un enfoque integral del bienestar."`,
    'Dra. Dalva Rosmilda Hernández Canela': `La Dra. Dalva Hernández Canela es médica especialista en Dermatología y Venereología, con formación en Medicina Interna y enfoque integral en el cuidado de la piel y la salud dermatológica.

Es Doctora en Medicina Cum Laude por la UASD y actualmente cursa una Subespecialidad en Cirugía Dermatológica en el IDCP.

Cita personal:
"Mi compromiso es ofrecer una dermatología basada en la ciencia, con un enfoque humano, ético y personalizado para cada paciente."`,
    'Dra. Haydely Mena': `La Dra. Haydely Mena es médica con formación especializada en Medicina Estética, enfocada en bienestar integral, armonización facial y tratamientos innovadores mínimamente invasivos.

Es Doctora en Medicina por la PUCMM y cuenta con un Máster en Medicina Estética y Longevidad por la Universidad de Alcalá de Henares.

Cita personal:
"Mi objetivo es realzar la belleza natural de cada paciente, priorizando la seguridad, la ética médica y resultados que armonicen con su esencia."`,
};

const BASE_SERVICES_DATA: Service[] = [
    // Armonización Facial
    { id: 1, name: 'Aumento de Labios', category: ServiceCategory.ArmonizacionFacial, imageUrl: resolveLocalImage('Aumento de labios 1 .png'), description: 'Nuestro tratamiento de aumento de labios con ácido hialurúnico está diseñado para realzar tu belleza natural, proporcionando volumen y definición a tus labios de manera segura y efectiva.' },
    { id: 2, name: 'Relleno de Ojeras', category: ServiceCategory.ArmonizacionFacial, imageUrl: resolveLocalImage('https://i.postimg.cc/5bmfd35J/Relleno-de-ojeras.png'), description: 'Nuestro tratamiento de relleno de ojeras está diseñado para rejuvenecer tu mirada, eliminando el aspecto cansado y fatigado que puede ser causado por ojeras marcadas.' },
    { id: 3, name: 'Reposicionamiento Malar', category: ServiceCategory.ArmonizacionFacial, imageUrl: resolveLocalImage('https://i.postimg.cc/nncpHDTm/Reposicionamiento-malar.jpg'), description: 'El reposicionamiento malar, o puntos de anclaje, es una técnica avanzada para restaurar el soporte natural del rostro, mejorar el contorno facial y lograr un efecto de lifting sutil y natural, sin cirugía.' },
    { id: 4, name: 'Relleno de Surcos Nasogenianos', category: ServiceCategory.ArmonizacionFacial, imageUrl: resolveLocalImage('https://i.postimg.cc/mT2BbHVP/Relleno-de-surcos.png'), description: 'Nuestro tratamiento de relleno de surcos está diseñado para restaurar el volumen perdido y suavizar esas líneas, devolviendo a tu rostro un aspecto más juvenil y fresco.' },
    { id: 5, name: 'Hilos Tensores PDO', category: ServiceCategory.ArmonizacionFacial, imageUrl: resolveLocalImage('https://i.postimg.cc/ysPRWNCh/Hilos-Tensores-PDO.png'), description: 'Los hilos tensores PDO (polidioxanona) son hilos biodegradables que se insertan en la piel para proporcionar soporte estructural y estimular la producción de colágeno, ofreciendo un efecto lifting inmediato.' },
    { id: 6, name: 'Rinomodelación con Hilos Tensores + Ácido Hialurónico', category: ServiceCategory.ArmonizacionFacial, imageUrl: resolveLocalImage('Rinomodelación.jpeg'), description: 'La rinomodelación con hilos tensores y ácido hialurónico permite mejorar forma, proyección y definición de la nariz sin cirugía, con resultados naturales y armónicos.' },
    { id: 7, name: 'Marcación Mandibular y Proyección Mentón', category: ServiceCategory.ArmonizacionFacial, imageUrl: resolveLocalImage('Marcación mandibular.PNG'), description: 'Procedimientos de armonización facial diseñados para definir, equilibrar y fortalecer el contorno del rostro, aportando estructura, simetría y una apariencia más armónica y rejuvenecida.' },
    { id: 8, name: 'Toxina Botulínica', category: ServiceCategory.ArmonizacionFacial, imageUrl: resolveLocalImage('https://i.postimg.cc/KGLy9rc5/Toxina-Botulinica.png'), description: 'La toxina botulínica, comúnmente conocida como Botox, es uno de los tratamientos estéticos más populares para combatir las arrugas y líneas de expresión relajando temporalmente los másculos faciales.' },
    
    // Rejuvenecimiento
    { id: 9, name: 'Morpheus8 Rostro y Cuello', category: ServiceCategory.Rejuvenecimiento, imageUrl: resolveLocalImage('Morpheus.png'), description: 'Tratamiento de rejuvenecimiento para rostro y cuello que combina microagujas y radiofrecuencia fraccionada para mejorar firmeza, textura y calidad de la piel.' },
    { id: 10, name: 'Thermage FLX', category: ServiceCategory.Rejuvenecimiento, imageUrl: resolveLocalImage('Thermage1.jpeg'), description: 'Tratamiento de radiofrecuencia no invasivo que estimula colágeno y mejora firmeza, textura y efecto tensor en el rostro.' },
    { id: 11, name: 'Láser CO2 en Rostro', category: ServiceCategory.Rejuvenecimiento, imageUrl: resolveLocalImage('Laser Co2 rostro.jpeg'), description: 'Tratamiento de rejuvenecimiento facial con láser CO2 para mejorar textura, tono, poros y signos de fotoenvejecimiento.' },
    { id: 12, name: 'Endolifting Facial', category: ServiceCategory.Rejuvenecimiento, imageUrl: resolveLocalImage('https://i.postimg.cc/qpv3Kdpb/Endolifting-Facial.png'), description: 'Tratamiento avanzado de rejuvenecimiento facial no quirúrgico que utiliza energía láser para reafirmar la piel, redefinir contornos y estimular la producción de colágeno.' },
    { id: 13, name: 'Carbón Laser Peel', category: ServiceCategory.Rejuvenecimiento, imageUrl: resolveLocalImage('https://i.postimg.cc/s3VDv8fX/carbon-peel.jpg'), description: 'Un revolucionario tratamiento láser no invasivo que ayuda a rejuvenecer la apariencia de la piel envejecida y dañada. Es ideal para tratar imperfecciones menores de la piel, mejorar el tono y la textura.' },
    { id: 14, name: 'HIFU Facial', category: ServiceCategory.Rejuvenecimiento, imageUrl: resolveLocalImage('https://i.postimg.cc/MWH6YQQZ/HIUF.jpg'), description: 'HIFU (Ultrasonido Focalizado de Alta Intensidad) es un tratamiento revolucionario para el rejuvenecimiento facial y corporal que ofrece resultados de lifting sin necesidad de cirugía.' },
    { id: 15, name: 'Bioestimuladores de Colágeno', category: ServiceCategory.Rejuvenecimiento, imageUrl: resolveLocalImage('https://i.postimg.cc/D7wXGK7N/Bioestimuladores.jpg'), description: 'Sustancias biocompatibles que se inyectan en la piel para estimular la producción natural de colágeno y elastina, mejorando la textura y la firmeza a largo plazo.' },
    { id: 16, name: 'Mesoterapia NCTF', category: ServiceCategory.Rejuvenecimiento, imageUrl: resolveLocalImage('https://i.postimg.cc/2YPk438z/NCTF.jpg'), description: 'Tratamiento diseñado para revitalizar la piel desde el interior, utilizando un complejo exclusivo de ácido hialurúnico y más de 50 ingredientes activos.' },
    { id: 17, name: 'Plasma Rico en Plaquetas', category: ServiceCategory.Rejuvenecimiento, imageUrl: resolveLocalImage('https://i.postimg.cc/R4mvD8HH/PLASMA.jpg'), description: 'Tratamiento estético innovador que utiliza las propiedades regenerativas de la sangre del propio paciente para mejorar la apariencia de la piel y promover la regeneración celular.' },
    { id: 18, name: 'Profhilo', category: ServiceCategory.Rejuvenecimiento, imageUrl: resolveLocalImage('https://i.postimg.cc/Z4cN0qz3/Profhilo.png'), description: 'Tratamiento revolucionario basado en ácido hialurúnico diseñado para mejorar la hidratación, elasticidad y firmeza de la piel, mejorando globalmente la calidad de la piel.' },
    { id: 19, name: 'Factores de Crecimiento', category: ServiceCategory.Rejuvenecimiento, imageUrl: resolveLocalImage('https://i.postimg.cc/gY7Yt2V6/Factores-de-crecimiento.jpg'), description: 'Una de las terapias más avanzadas en medicina regenerativa estética, diseñadas para estimular la regeneración celular y promover un rejuvenecimiento profundo desde el interior.' },
    { id: 53, name: 'Hilos de Colágeno', category: ServiceCategory.Rejuvenecimiento, imageUrl: resolveLocalImage('armonizacion facial .jpeg'), description: 'Tratamiento de rejuvenecimiento que estimula la producción natural de colágeno para mejorar firmeza, textura y calidad de la piel.' },
    { id: 54, name: 'Microagujas en Rostro', category: ServiceCategory.Rejuvenecimiento, imageUrl: resolveLocalImage('MICROAGUJAS ROSTRO.jpg'), description: 'Procedimiento de microneedling para estimular colágeno y elastina, mejorar textura, poros, líneas finas y marcas de acné.' },
    { id: 55, name: 'PDRN de Salmón', category: ServiceCategory.Rejuvenecimiento, imageUrl: resolveLocalImage('pdrn salmon .jpeg'), description: 'Tratamiento regenerativo con polinucleótidos biocompatibles que mejora hidratación, elasticidad, luminosidad y reparación cutánea.' },

    // Estética Corporal
    { id: 20, name: 'Morpheus8 Corporal', category: ServiceCategory.EsteticaCorporal, imageUrl: resolveLocalImage('Morpheus8 corporal.jpeg'), description: 'Tratamiento corporal con microagujas y radiofrecuencia para mejorar firmeza, textura de la piel y apariencia de la celulitis.' },
    { id: 21, name: 'Mesoterapia Corporal', category: ServiceCategory.EsteticaCorporal, imageUrl: resolveLocalImage('https://i.postimg.cc/gz6GCb49/mesoterapia-grasa.jpg'), description: 'Tratamiento altamente efectivo para la reducción de grasa localizada y medidas, ayudándote a esculpir tu figura de manera segura y no invasiva.' },
    { id: 22, name: 'Tratamiento de Estrías', category: ServiceCategory.EsteticaCorporal, imageUrl: resolveLocalImage('https://i.postimg.cc/LmN4fThz/Eliminacion-de-estrias.jpg'), description: 'Ofrecemos soluciones avanzadas para reducir la visibilidad de las estrías, mejorando el aspecto general de la piel mediante técnicas como microagujas y láser.' },
    { id: 23, name: 'Tratamiento de Manchas', category: ServiceCategory.EsteticaCorporal, imageUrl: resolveLocalImage('https://i.postimg.cc/wx89H44b/Mesoterapia-manchas.jpg'), description: 'Utilizamos peelings y mesoterapia para tratar manchas solares, melasma y otras irregularidades pigmentarias, logrando una piel más uniforme y radiante.' },
    { id: 24, name: 'Blanqueamientos', category: ServiceCategory.EsteticaCorporal, imageUrl: resolveLocalImage('https://i.postimg.cc/9cWFrSXW/blanqueamiento-quimico.jpg'), description: 'Tratamientos estéticos diseñados para aclarar la piel y reducir manchas, hiperpigmentación y otros tonos desiguales, promoviendo una renovación celular.' },
    { id: 25, name: 'Enzimas Recombinantes', category: ServiceCategory.EsteticaCorporal, imageUrl: resolveLocalImage('https://i.postimg.cc/Td3dB01S/IMG-7027.jpg'), description: 'Avance innovador en la estética no invasiva para tratar problemas como la celulitis, la flacidez y las acumulaciones localizadas de grasa.' },
    { id: 26, name: 'Endolifting Corporal', category: ServiceCategory.EsteticaCorporal, imageUrl: resolveLocalImage('https://i.postimg.cc/nnhDmtnw/Endolaser-Corporal.png'), description: 'Tratamiento avanzado de moldeado corporal no quirúrgico que utiliza energía láser para reducir grasa localizada, mejorar la flacidez y estimular la producción de colágeno.' },
    { id: 27, name: 'Cavitación', category: ServiceCategory.EsteticaCorporal, imageUrl: resolveLocalImage('https://i.postimg.cc/9cJXTpzz/Enzimas-en-papada-(1).jpg'), description: 'Tratamiento estético no invasivo que utiliza tecnología de ultrasonido para eliminar la grasa localizada, combatir la celulitis y mejorar la flacidez de la piel.' },
    { id: 56, name: 'Láser CO2 para Manchas Corporales', category: ServiceCategory.EsteticaCorporal, imageUrl: resolveLocalImage('blanqueamiento laser co2 .png'), description: 'Tratamiento corporal para manchas localizadas que mejora el tono y la uniformidad de la piel mediante láser CO2.' },
    { id: 57, name: 'Láser CO2 para Cicatrices Corporales', category: ServiceCategory.EsteticaCorporal, imageUrl: resolveLocalImage('Laser Co2 cicatrices .jpeg'), description: 'Tratamiento con láser CO2 para mejorar cicatrices corporales estimulando la regeneración y la producción de colágeno.' },
   
    // Nutrición Clínica
    { id: 28, name: 'Consulta Nutricional', category: ServiceCategory.NutricionClinica, imageUrl: resolveLocalImage('https://i.postimg.cc/JRP7JqtD/consulta-nutricional.png'), description: 'Contamos con un equipo especializado en Nutriología Clínica que trabaja contigo para alcanzar tus metas de salud y belleza de manera sostenible y personalizada.' },
    { id: 29, name: 'Programa Pérdida de Peso', category: ServiceCategory.NutricionClinica, imageUrl: resolveLocalImage('https://i.postimg.cc/tyWXDyYZ/perdida-de-peso.jpg'), description: 'Nuestro Programa de Inhibición de Apetito combina herramientas científicas y apoyo constante para garantizar resultados efectivos y sostenibles en el control de tu apetito.' },
    
    // Ginecoestetica
    { id: 30, name: 'Labioplastia Láser', category: ServiceCategory.Ginecoestetica, imageUrl: resolveLocalImage('https://i.postimg.cc/9W0mB7q6/labioplastia.png'), description: 'Procedimiento estético diseñado para remodelar los labios vaginales, ya sea para reducir su tamaño o mejorar su forma, con una intervención precisa y mínimamente invasiva.' },
    { id: 31, name: 'Perineoplastia Láser', category: ServiceCategory.Ginecoestetica, imageUrl: resolveLocalImage('https://i.postimg.cc/HHXp3HVT/perineoplastia.jpg'), description: 'Procedimiento estético y reconstructivo que utiliza tecnología láser para rejuvenecer y restaurar la elasticidad del perineo.' },
    { id: 32, name: 'Relleno de Labios Mayores', category: ServiceCategory.Ginecoestetica, imageUrl: resolveLocalImage('https://i.postimg.cc/PdrTtwKx/relleno-labios-mayores.jpg'), description: 'Procedimiento estético que busca aumentar el volumen y mejorar la forma de los labios vaginales externos con ácido hialurúnico.' },
    { id: 33, name: 'Aumento de Punto G', category: ServiceCategory.Ginecoestetica, imageUrl: resolveLocalImage('https://i.postimg.cc/hc8t4gB3/Aumento-punto-g.png'), description: 'Procedimiento estético que utiliza ácido hialurúnico para aumentar y realzar la sensibilidad del punto G, mejorando la experiencia sexual.' },
    { id: 34, name: 'Tensado Vaginal Láser CO2', category: ServiceCategory.Ginecoestetica, imageUrl: resolveLocalImage('https://i.postimg.cc/t9Sy74mV/TENSADO-LASER-CO2.jpg'), description: 'Procedimiento no invasivo que utiliza tecnología láser para estimular la regeneración de los tejidos vaginales, mejorando la elasticidad y firmeza.' },
    { id: 35, name: 'Tensado Vaginal HIFU', category: ServiceCategory.Ginecoestetica, imageUrl: resolveLocalImage('https://i.postimg.cc/ZJK4Tdj6/Tensado-HIFU.jpg'), description: 'Tratamiento no invasivo que utiliza ultrasonido focalizado para estimular la producción de colágeno y elastina en la zona vaginal.' },
    { id: 36, name: 'Vaporización Cervical', category: ServiceCategory.Ginecoestetica, imageUrl: resolveLocalImage('https://i.postimg.cc/rc1kxJPS/vaporizacion-cervical.jpg'), description: 'Procedimiento médico que utiliza tecnología láser para tratar diversas condiciones del cuello uterino, como lesiones precoces o tejido anormal.' },
    { id: 37, name: 'Chip de la Juventud', category: ServiceCategory.Ginecoestetica, imageUrl: resolveLocalImage('https://i.postimg.cc/DFL25Fmt/Pellets.jpg'), description: 'Pellets de testosterona que se implantan bajo la piel para liberar lentamente la hormona, restaurando los niveles hormonales y mejorando la salud y el bienestar general.' },
    { id: 58, name: 'Reducción de Capuchón del Clítoris con Láser', category: ServiceCategory.Ginecoestetica, imageUrl: resolveLocalImage('labioplastia.png'), description: 'Procedimiento de ginecología estética mínimamente invasivo para reducir exceso de tejido en el capuchón del clítoris y mejorar armonía íntima.' },
    { id: 59, name: 'Tensado Vaginal Duplex', category: ServiceCategory.Ginecoestetica, imageUrl: resolveLocalImage('TENSADO LASER CO2.jpg'), description: 'Tratamiento láser de doble acción para mejorar tonicidad, elasticidad y firmeza de los tejidos vaginales sin cirugía.' },
    { id: 60, name: 'Fulguración de Verrugas Genitales', category: ServiceCategory.Ginecoestetica, imageUrl: resolveLocalImage('vaporizacion cervical.jpg'), description: 'Procedimiento médico para eliminar verrugas genitales por VPH de forma precisa, segura y con adecuada preservación del tejido sano.' },

    // Medicina Capilar
    { id: 38, name: 'Mesoterapia Capilar', category: ServiceCategory.MedicinaCapilar, imageUrl: resolveLocalImage('https://i.postimg.cc/1mNyk1BL/mesoterapia-capilar.jpg'), description: 'Tratamiento médico no invasivo diseñado para combatir la caída del cabello y mejorar su calidad, mediante microinyecciones de un cóctel de vitaminas y nutrientes.' },
    { id: 39, name: 'Alta Frecuencia Capilar', category: ServiceCategory.MedicinaCapilar, imageUrl: resolveLocalImage('https://i.postimg.cc/npfLtr6z/alta-frecuencia-capialr.jpg'), description: 'Técnica no invasiva que utiliza corrientes eléctricas suaves para estimular el cuero cabelludo, mejorando la circulación sanguínea y oxigenando los folículos pilosos.' },

    // Microcirugías
    { id: 40, name: 'Lipopapada', category: ServiceCategory.Microcirugias, imageUrl: resolveLocalImage('lipopapada.jpeg'), description: 'Procedimiento ambulatorio que consiste en la eliminación de grasa localizada en la zona del cuello y debajo del mentón, redefiniendo el contorno mandibular.' },
    { id: 41, name: 'Alectomía', category: ServiceCategory.Microcirugias, imageUrl: resolveLocalImage('Alectomia(1).jpeg'), description: 'Técnica quirúrgica mínimamente invasiva ideal para quienes desean reducir el ancho de las fosas nasales y mejorar la apariencia de su nariz de manera sutil pero efectiva.' },
    { id: 42, name: 'Lobuloplastia', category: ServiceCategory.Microcirugias, imageUrl: resolveLocalImage('https://i.postimg.cc/6WGBkxch/lobuloplastia.jpg'), description: 'Procedimiento quirúrgico mínimamente invasivo diseñado para reparar y restaurar el lóbulo de la oreja, ya sea por rasgaduras, dilataciones o deformidades.' },
    { id: 43, name: 'Blefaroplastia', category: ServiceCategory.Microcirugias, imageUrl: resolveLocalImage('https://i.postimg.cc/qpkMzYBJ/blefaroplastia.jpg'), description: 'Cirugía ambulatoria que mejora la apariencia de los párpados superiores e inferiores, eliminando flacidez, bolsas de grasa y exceso de piel.' },

    // Cosmiatría
    { id: 44, name: 'Depilación Láser Diodo', category: ServiceCategory.Cosmiatria, imageUrl: resolveLocalImage('https://i.postimg.cc/rVtqB2j5/Laser-diodo.jpg'), description: 'Método avanzado y efectivo para la eliminación permanente del vello no deseado. Utiliza un láser de diodo que daña el folículo y reduce su capacidad de producir vello.' },
    { id: 45, name: 'Depilación Láser Soprano', category: ServiceCategory.Cosmiatria, imageUrl: resolveLocalImage('https://i.postimg.cc/rVtqB2j5/Laser-diodo.jpg'), description: 'Tecnología líder en el mercado reconocida por su eficacia, seguridad y comodidad. Diseñado para adaptarse a todos los tipos de piel, incluyendo pieles bronceadas.' },
    { id: 46, name: 'Facial Profundo', category: ServiceCategory.Cosmiatria, imageUrl: resolveLocalImage('https://i.postimg.cc/PX8dgnyS/Limpieza-profunda.png'), description: 'Tratamiento esencial para eliminar las impurezas acumuladas en la piel, dejando el rostro fresco, limpio y renovado, mejorando la oxigenación y la salud general de la piel.' },
    { id: 47, name: 'Casmara', category: ServiceCategory.Cosmiatria, imageUrl: resolveLocalImage('https://i.postimg.cc/xjD9YppB/monodosis-casmara.jpg'), description: 'Tratamientos faciales profesionales de alta concentración, diseñados para ofrecer resultados visibles desde la primera aplicación con activos específicos para cada necesidad de la piel.' },
    { id: 48, name: 'Hydrafacial', category: ServiceCategory.Cosmiatria, imageUrl: resolveLocalImage('https://i.postimg.cc/gGNcRDrQ/hydrafacial.jpg'), description: 'Innovador tratamiento facial no invasivo que combina limpieza profunda, exfoliación, extracción de impurezas e hidratación intensiva en un solo procedimiento.' },
    { id: 49, name: 'Peeling', category: ServiceCategory.Cosmiatria, imageUrl: resolveLocalImage('https://i.postimg.cc/RmjScqVC/Peeling.jpg'), description: 'Procedimiento estético que implica la aplicación de una solución química sobre la piel para exfoliar las capas superficiales, promoviendo la renovación celular.' },
    { id: 50, name: 'Babor', category: ServiceCategory.Cosmiatria, imageUrl: resolveLocalImage('https://i.postimg.cc/0PGy5xvq/Babor-jpg.jpg'), description: 'Tratamiento de lujo que combina la ciencia avanzada del cuidado de la piel con ingredientes exclusivos para ofrecer resultados excepcionales de hidratación y luminosidad.' },
    
    // Sueroterapia
    { id: 51, name: 'Sueroterapia Complex', category: ServiceCategory.Sueroterapia, imageUrl: resolveLocalImage('https://i.postimg.cc/09ywSq9X/Sueroterapia-Complex.png'), description: 'Tratamiento intravenoso diseñado para revitalizar el organismo desde el interior, aportando una combinación de glutatión, vitamina C, B12, B6, biotina y antioxidantes.' },
    { id: 52, name: 'Sueroterapia NAD+', category: ServiceCategory.Sueroterapia, imageUrl: resolveLocalImage('https://i.postimg.cc/SmxM9pmv/Sueroterapia-NAD.png'), description: 'Tratamiento intravenoso avanzado enfocado en la regeneración celular y el bienestar integral, ideal para apoyar los procesos de antiaging, energía y salud metabólica.' },
];

export const SERVICES_DATA: Service[] = BASE_SERVICES_DATA.map((service) => ({
    ...service,
    description: FULL_SERVICE_DESCRIPTIONS[service.name] ?? service.description,
}));

export const TECHNOLOGIES_DATA: Technology[] = [
    { id: 1, name: 'Bioestimuladores', imageUrl: resolveLocalImage('https://i.postimg.cc/D7wXGK7N/Bioestimuladores.jpg') },
    { id: 2, name: 'Endolaser Corporal', imageUrl: resolveLocalImage('https://i.postimg.cc/nnhDmtnw/Endolaser-Corporal.png') },
    { id: 3, name: 'Endolifting Facial', imageUrl: resolveLocalImage('https://i.postimg.cc/qpv3Kdpb/Endolifting-Facial.png') },
    { id: 4, name: 'Hilos Tensores PDO', imageUrl: resolveLocalImage('https://i.postimg.cc/ysPRWNCh/Hilos-Tensores-PDO.png') },
    { id: 5, name: 'L?ser Picosecond', imageUrl: resolveLocalImage('https://i.postimg.cc/wgVN3BYL/Laser-Picosecond.png') },
    { id: 6, name: 'Profhilo', imageUrl: resolveLocalImage('https://i.postimg.cc/Z4cN0qz3/Profhilo.png') },
    { id: 7, name: 'Sueroterapia Complex', imageUrl: resolveLocalImage('https://i.postimg.cc/09ywSq9X/Sueroterapia-Complex.png') },
    { id: 8, name: 'Sueroterapia NAD+', imageUrl: resolveLocalImage('https://i.postimg.cc/SmxM9pmv/Sueroterapia-NAD.png') },
];

const BASE_TEAM_DATA: TeamMember[] = [
    { id: 1, name: 'Dr. Steele Francisco Mejía López', shortSpecialty: 'Director Médico', specialty: 'Director Médico | Medicina Estética, Armonización Facial, Cirugía de Trasplante Capilar y Endolaser', imageUrl: resolveLocalImage('https://i.postimg.cc/R4PZymzZ/Dr-Steele-Mejia.jpg'), bio: 'Con más de 10 años de experiencia en el campo de la salud. Graduado en Medicina por la Universidad Autónoma de Santo Domingo, ha complementado su formación con una Maestría en Medicina Estética y un entrenamiento avanzado en trasplante capilar. Actualmente, es Director Médico de Be Aesthetic, donde supervisa y coordina todos los procedimientos médicos, garantizando atención personalizada y de alta calidad para cada paciente. Su enfoque est? en proporcionar soluciones estéticas seguras, innovadoras y adaptadas a las necesidades individuales de sus pacientes. "Creo firmemente en la medicina estética como una forma de realzar la belleza natural, siempre priorizando la salud y el bienestar de mis pacientes. Cada tratamiento es una oportunidad para mejorar la calidad de vida, con resultados que reflejan equilibrio, naturalidad y armon?a."' },
    { id: 2, name: 'Dra. Rosaina De Los Santos Jiménez', shortSpecialty: 'Ginecología Estética', specialty: 'Líder en Ginecología, Obstetricia, Colposcopia y Ginecología Estética', imageUrl: resolveLocalImage('https://i.postimg.cc/4XmxT0Jw/Dra-Rosaina-de-los-Santos.jpg'), bio: 'Especialista en ginecología-obstetricia, colposcop?a y ginecología estética. Con una amplia experiencia en procedimientos ginecol?gicos avanzados, incluyendo más de 500 partos vaginales, mil cesáreas y 800 colposcopias, se ha consolidado como una figura destacada en su campo. Graduada con honores Cum Laude en 2012 de la UASD. "Mi misión es ofrecer servicios médicos que no solo promuevan la salud femenina, sino que también integren el bienestar estético y el autocuidado, para que cada paciente se sienta cuidada en todas las etapas de su vida."' },
    { id: 5, name: 'Dra. Nathalia Cruz Vásquez', shortSpecialty: 'Medico Estético', specialty: 'Medico Estético | Antiaging y Armonización Facial y Corporal', imageUrl: resolveLocalImage('https://i.postimg.cc/jsn2yFmq/Dra-Nathalia-Cruz.jpg'), bio: 'Médico con máster en Medicina Estética, Anti-Aging y Nutrici?n, especializada en tratamientos faciales y corporales orientados al rejuvenecimiento integral. Su enfoque combina ciencia, técnica y estética para lograr resultados naturales, seguros y personalizados, priorizando la armon?a facial, la salud de la piel y el bienestar general del paciente. "El antiaging es cuidar hoy lo que deseas conservar ma?ana."' },
    { id: 16, name: 'Dra. Ana Cordero Ramón', shortSpecialty: 'Nutrióloga Clínica y Medicina Estética', specialty: 'Doctora en Medicina | Nutrióloga Clínica | Medicina Estética', imageUrl: anaCorderoImage, bio: 'Doctora en Medicina egresada de la Universidad Autónoma de Santo Domingo (UASD), con Especialidad en Nutriología Clínica del Instituto Tecnol?gico de Santo Domingo (INTEC). Complementa su formación con diplomados en Diabetolog?a y Obesolog?a del Instituto de Capacitaci?n Profesional y Empresarial (INCAPRE/UAPA), así como un Diplomado en Nutrici?n Orientada al Deporte del C?rculo de Inter?s en la Formaci?n Médico-Cient?fica (CIFMEC). Cuenta además con especialidad en Medicina Estética, integrando un enfoque clúnico, preventivo y estético orientado al bienestar integral del paciente. "La salud se construye con conocimiento, prevención y un enfoque integral del bienestar."' },
    { id: 10, name: 'Dra. Sarah Priscila Escaño Estrella', shortSpecialty: 'Anestesióloga y Médico Estético', specialty: 'Anestesióloga y Médico Estético', imageUrl: resolveLocalImage('https://i.postimg.cc/33dxHqKR/Dra-Sarah-Escano.jpg'), bio: 'Con más de ocho años de experiencia. Graduada en Medicina por la Universidad Autónoma de Santo Domingo, ha realizado una especialización en Anestesiolog?a y un Máster en Medicina Estética y Armonización Facial en Sao Paulo, Brasil. Su pasión por la estética se refleja en su formación continua y experiencia en tratamientos avanzados. "Mi objetivo es que cada paciente logre sentirse más seguro y pleno con su apariencia, brindando resultados naturales y personalizados."' },
    { id: 9, name: 'Dra. Perla M. Simón Villegas', shortSpecialty: 'Medicina y Cosmiatra Avanzada', specialty: 'Doctora en Medicina y Cosmiatra Avanzada', imageUrl: resolveLocalImage('https://i.postimg.cc/cxqHhcG8/Dra-Perla-Simon.jpg'), bio: 'Profesional comprometida con la salud y el bienestar de sus pacientes. Egresada en Medicina por la Universidad Tecnol?gica de Santiago (UTESA), complementa su formación con un Diplomado en Cosmiatría Avanzada por la UAPA y un Diplomado en Destreza Hospitalarias por CIFMEC en Santo Domingo. Su enfoque en brindar atención médica de calidad la distingue como una profesional empética y dedicada. "Cada paciente es único, y mi misión es ofrecer un cuidado personalizado, comprometido con su salud y belleza."' },
    { id: 4, name: 'Dra. Jismel Ramírez', shortSpecialty: 'Ginecología Estética y Oncológica', specialty: 'Ginecología Estética y Oncológica | Colposcopia', imageUrl: resolveLocalImage('https://i.postimg.cc/3K0N2c6c/Dra-Jismel-Ramirez.jpg'), bio: 'Médico especialista en ginecología y obstetricia, con subespecialidad en ginecología oncológica y amplia formación quirúrgica. Combina su experiencia clínica con un enfoque en ginecología estética, funcional y antiaging, orientado a la prevención, el bienestar íntimo y la salud integral de la mujer. Su pr?ctica se basa en la medicina humanizada y en soluciones personalizadas. "Cuidar la salud femenina también es preservar su bienestar, autoestima y calidad de vida."' },
    { id: 11, name: 'Dra. Anny Frías', shortSpecialty: 'Cirujana Plástica', specialty: 'Cirujana Plástica, reconstructiva y estética.', imageUrl: resolveLocalImage('https://i.postimg.cc/YtsjGHXg/Dra-Anny-Frias.jpg'), bio: 'Médico General, Cirujana General y Cirujana Plástica y Reconstructiva, con una trayectoria de casi dos d?cadas dedicada al cuidado integral del paciente. Posee amplia experiencia en procedimientos quirúrgicos y estéticos, integrando precisi?n médica, criterio clúnico y sentido estético. Es miembro activo de SODOCIPRE. "La cirugía y la medicina estética deben practicarse con responsabilidad, ética y un profundo respeto por la salud y la individualidad de cada paciente."' },
    { id: 7, name: 'Dra. Jhanna María Soto Ruiz', shortSpecialty: 'Cirugía Estética y Antiaging', specialty: 'Médico | Cirugía Estética, Reconstructiva y Antiaging', imageUrl: resolveLocalImage('https://i.postimg.cc/F9kz0Bq6/Dra-Jhanna-Soto.jpg'), bio: 'Médico con formación en cirugía general y cirugía pl?stica reconstructiva, con amplia experiencia acad?mica y quirúrgica. Integra técnicas quirúrgicas y no invasivas con un enfoque estético y antiaging, orientado a la armonización corporal, el rejuvenecimiento y la mejora funcional y estética, siempre con altos est?ndares médicos y cient?ficos. "La estética bien realizada transforma sin perder la esencia de cada persona."' },
    { id: 6, name: 'Dra. Katherin Reyes', shortSpecialty: 'Estética Integral y Bienestar', specialty: 'Doctora en Medicina | Estética Integral y Bienestar', imageUrl: resolveLocalImage('https://i.postimg.cc/x0N8L4hY/Dra-Katherine-Reyes.jpg'), bio: 'Doctora en Medicina con experiencia clínica en urgencias y consulta general, enfocada en medicina estética y bienestar integral. Aplica un enfoque preventivo y antiaging, orientado a mejorar la calidad de la piel, la salud corporal y la confianza del paciente, siempre desde una base médica responsable y personalizada. "La estética responsable nace del cuidado médico y el respeto por la naturalidad."' },
    { id: 3, name: 'Dra. Anyi María Abreu Tavárez', shortSpecialty: 'Salud Femenina y Estética', specialty: 'Médico | Enfoque en Salud Femenina, Estética y Antiaging', imageUrl: resolveLocalImage('https://i.postimg.cc/TTwp3wc3/Dra-Anyi-Abreu.jpg'), bio: 'Doctora en Medicina con formación en ginecología y obstetricia, experiencia clínica, auditor?a médica y docencia. Su ejercicio profesional integra la salud femenina con un enfoque preventivo, estético y antiaging, promoviendo el equilibrio hormonal, el bienestar integral y la calidad de vida de la mujer. Se distingue por su ética, compromiso y atención personalizada. "La verdadera estética comienza con la salud, el equilibrio y el cuidado integral de la mujer."' },
    { id: 14, name: 'Dra. Dalva Rosmilda Hernández Canela', shortSpecialty: 'Dermatología y Tricología', specialty: 'Dermatología ? Medicina Interna ? Tricología', imageUrl: resolveLocalImage('https://i.postimg.cc/bqBdDh69/Dra-Dalva-Hernandez.jpg'), bio: 'Médica especialista en Dermatología y Venereolog?a, con formación en Medicina Interna y enfoque integral en el cuidado de la piel y la salud dermatol?gica. Es Doctora en Medicina Cum Laude por la UASD y actualmente cursa una Subespecialidad en Cirugía Dermatol?gica. "Mi compromiso es ofrecer una dermatolog?a basada en la ciencia, con un enfoque humano, ?tico y personalizado para cada paciente."' },
    { id: 15, name: 'Dra. Haydely Mena', shortSpecialty: 'Medicina Estética', specialty: 'Medicina Estética ? Armonización facial', imageUrl: resolveLocalImage('https://i.postimg.cc/5xQy8RGp/Dra-Haydely-Mena.jpg'), bio: 'Médica con formación especializada en Medicina Estética, enfocada en el bienestar integral, la armonización facial y el uso de tratamientos innovadores y m?nimamente invasivos. Es Doctora en Medicina por la PUCMM y cuenta con un Máster en Medicina Estética y Longevidad por la Universidad de Alcal? de Henares. "Mi objetivo es realzar la belleza natural de cada paciente, priorizando la seguridad, la ética médica y resultados que armonicen con su esencia."' },
    { id: 18, name: 'Dra. Manuela Pichardo Espinal', shortSpecialty: 'Médico Estético', specialty: 'Médico Estético', imageUrl: manuelaPichardoImage, bio: 'La Dra. Manuela Pichardo Espinal es Médico Estético con formación internacional y experiencia en procedimientos mínimamente invasivos enfocados en el rejuvenecimiento facial, la armonización y el cuidado integral de la piel. Obtuvo su título de Doctor en Medicina en la Universidad Tecnológica de Santiago (UTESA) y cuenta con un Máster en Medicina Estética por el Centro Europeo de Masters y Postgrados (CEMP) / UCAM. Además, posee especialización en Medicina Estética en la Escuela AVICENA (Buenos Aires, Argentina) y formación avanzada en Cosmiatría y Dermatocosmiatría Internacional. "Cada tratamiento debe ser tan único como el paciente que lo recibe."' },
    { id: 13, name: 'Dra. Nixaury María Rodríguez Cuevas', shortSpecialty: 'Médico General', specialty: 'Médico General - Cosmiatría Avanzada', imageUrl: resolveLocalImage('https://i.postimg.cc/y1qdjTCV/Dra-Niaury-Rodriguez.jpg'), bio: 'Médico General, egresada de la Universidad Tecnol?gica de Santiago (UTESA), con experiencia en atención primaria, medicina interna y manejo integral del paciente. Su perfil se caracteriza por la vocaci?n de servicio, el compromiso con el aprendizaje continuo y el inter?s en el área estética y cosmética. "La medicina debe ejercerse con empat?a, responsabilidad y un verdadero compromiso con el bienestar del paciente."' },
    { id: 12, name: 'Dra. Denisse Marielys Cataño Martínez', shortSpecialty: 'Nutrióloga Clínica', specialty: 'Doctora en Medicina ? Nutrióloga Clínica', imageUrl: resolveLocalImage('https://i.postimg.cc/09BrMstf/Dra-Denisse-Catano.jpg'), bio: 'Doctora en Medicina, con formación complementaria como Nutrióloga Clínica. Cuenta con experiencia en centros hospitalarios, clínicas privadas e instituciones p?blicas. Su ejercicio profesional se distingue por la dedicaci?n, la disciplina y el enfoque integral en la salud del paciente. "La salud comienza con el cuidado consciente del cuerpo y el compromiso diario con el bienestar."' },
    { id: 8, name: 'Dra. Sorimar Espinal Reyes', shortSpecialty: 'Armonización Orofacial', specialty: 'Estomatolog?a, Armonización Orofacial y Dolor', imageUrl: resolveLocalImage('https://i.postimg.cc/mZBrf2Dc/Dra-Sorimar-Espinal.jpg'), bio: 'Profesional apasionada por la estomatolog?a y la armonización facial. Graduada en la Pontificia Universidad Cat?lica Madre y Maestra, se ha especializado en el manejo del dolor orofacial y craneomandibular, completando una maestr?a en la Universidad de Salamanca, Espa?a. Con una sólida trayectoria en diversas clínicas y hospitales, la Dra. Espinal est? comprometida con mejorar tanto la salud como la estética facial de sus pacientes. "La armon?a facial y la salud bucal no solo reflejan belleza, sino también bienestar y calidad de vida."' },
    { id: 17, name: 'Dra. Winifer Domínguez', shortSpecialty: 'Armonización Orofacial', specialty: 'Doctora en Odontología | Especialista en Armonización Orofacial', imageUrl: winiferDominguezImage, bio: 'La Dra. Winifer Domínguez es Doctora en Odontología con especialización internacional en Armonización Orofacial, enfocada en realzar la belleza y el equilibrio del rostro mediante procedimientos seguros, personalizados y basados en evidencia científica. Su enfoque se centra en lograr resultados naturales y armónicos, respetando siempre la anatomía facial y la esencia de cada paciente. Cuenta con especialización en Armonización Orofacial en Brasil, formación en Cosmetología en República Dominicana y un Máster en Dermatología Clínica en España, lo que le permite ofrecer un abordaje integral en el rejuvenecimiento facial y el cuidado avanzado de la piel. "La armonización orofacial es el equilibrio perfecto entre ciencia y estética."' },
    { id: 19, name: 'Dra. Anny Cabreja', shortSpecialty: 'Nutrióloga Clínica y Medicina Corporal', specialty: 'Nutrióloga Clínica y Medicina Corporal', imageUrl: annyCabrejaImage, bio: 'La Dra. Anny Cabreja es una nutrióloga clínica con amplia experiencia ayudando a pacientes a lograr pérdida de peso efectiva, segura y sostenible, obteniendo cambios reales en peso, medidas y salud. Su enfoque es completamente personalizado, abordando factores metabólicos, hormonales y conductuales para garantizar resultados duraderos sin recurrir a métodos extremos. Cuenta además con formación en procedimientos de medicina estética corporal, lo que le permite complementar sus tratamientos nutricionales con un enfoque integral orientado a la reducción de grasa, el mejoramiento de la composición corporal y la optimización de los resultados físicos y clínicos de sus pacientes. "Mi objetivo es que cada paciente logre un peso saludable de forma segura y sostenible, mejorando no solo su apariencia, sino también su salud, su energía y su calidad de vida a través de un enfoque clínico y personalizado."' },
];

export const TEAM_DATA: TeamMember[] = BASE_TEAM_DATA.map((member) => ({
    ...member,
    bio: FULL_TEAM_BIOS[member.name] ?? member.bio,
}));

export const TESTIMONIALS_DATA: Testimonial[] = [
    { id: 1, quote: 'Desde que llegu? a Be Aesthetic, me sent? acogida y valorada. El equipo fue incre?blemente profesional y atento, y me explicaron cada paso del tratamiento. Not? cambios en mi confianza desde la primera sesión. ?Totalmente recomendable!', author: 'María L.' },
    { id: 2, quote: 'La atención al cliente en Be Aesthetic es excepcional. Desde la primera consulta, el equipo se tom? el tiempo para entender mis objetivos y preocupaciones. Los resultados superaron mis expectativas, y estoy encantada con la transformación.', author: 'Ana G.' },
    { id: 3, quote: 'Buscaba un lugar que ofreciera un enfoque integral y lo encontr? en Be Aesthetic. La combinaci?n de nutrición y estética me ha ayudado a mejorar no solo mi apariencia, sino también mi salud general. ?Un gran equipo!', author: 'Fernando S.' },
    { id: 4, quote: 'Visitar Be Aesthetic fue una de las mejores decisiones que he tomado. Me ofrecieron tratamientos de vanguardia y me hicieron sentir c?modo en todo momento. El ambiente es relajante y el personal es muy amable. ?Definitivamente volver?!', author: 'Carla M.' },
];

export const LOCATIONS_DATA: Location[] = [
    { id: 'puntacana', name: 'Punta Cana', address: 'Av. Alemania esq. c. Cuba, Los Corales, B?varo.', phone: '+1 (829) 478-3262', mapsLink: 'https://maps.app.goo.gl/jdKc6MvZkUywZzTeA' },
    { id: 'puertoplata', name: 'Puerto Plata', address: 'Direcci?n de Puerto Plata aqu?.', phone: '+1 (809) 268-8948', mapsLink: 'https://maps.app.goo.gl/1cinubz2LksN43Tz6' },
    { id: 'santiago', name: 'Santiago', address: 'Av. Miraflores #30, Los Alamos.', phone: '+1 (829) 285-9105', mapsLink: 'https://maps.app.goo.gl/K24g5JqbwHjka5Jm6' },
    { id: 'santodomingo', name: 'Santo Domingo', address: 'C/ Lic. Carlos Sanchez #15 esq. Av. Tiradentes, Naco.', phone: '+1 (809) 639-2490', mapsLink: 'https://maps.app.goo.gl/hFKAZN8LH4g4Ev6m6' },
];




