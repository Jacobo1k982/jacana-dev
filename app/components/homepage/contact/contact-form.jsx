// @flow strict
import { isValidEmail } from "@/utils/check-email";
import axios from "axios";
import { useState } from "react";
import { TbMailForward, TbBrandWhatsapp } from "react-icons/tb";
import { toast } from "react-toastify";

function ContactForm() {
  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('email'); // 'email' o 'whatsapp'
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  const checkRequired = () => {
    const requiredFieldsValid =
      (activeTab === 'whatsapp' ? userInput.name && userInput.message : userInput.name && userInput.message && userInput.email);
    setError(prev => ({ ...prev, required: !requiredFieldsValid }));
  };

  const validateForm = () => {
    // Verificar campos requeridos
    if ((activeTab === 'email' && (!userInput.name || !userInput.message || !userInput.email)) ||
      (activeTab === 'whatsapp' && (!userInput.name || !userInput.message))) {
      setError({ email: false, required: true });
      return false;
    }

    // Validar email solo si está en la pestaña de email
    if (activeTab === 'email' && !isValidEmail(userInput.email)) {
      setError({ email: true, required: false });
      return false;
    }

    return true;
  };

  const handleSendMail = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);

      // Verificar que la URL de la API esté configurada
      if (!process.env.NEXT_PUBLIC_APP_URL) {
        throw new Error("La configuración del servidor no está disponible");
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/contact`,
        userInput,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (res.status >= 200 && res.status < 300) {
        toast.success("Mensaje enviado exitosamente!");
        setUserInput({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error(res.data?.message || "Error al enviar el mensaje");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error(error.response?.data?.message || error.message || "Error al enviar el mensaje");
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const phoneNumber = '50687905876'; // Reemplaza con tu número de WhatsApp
    const message = `Hola, soy ${userInput.name}. ${userInput.message}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="max-w-3xl mx-auto">
      <p className="font-medium mb-5 text-[#16f2b3] text-2xl uppercase text-center">Contáctanos</p>

      {/* Selector de método de contacto */}
      <div className="flex mb-6 rounded-lg bg-[#10172d] p-1 border border-[#353a52]">
        <button
          onClick={() => setActiveTab('email')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${activeTab === 'email' ? 'bg-gradient-to-r from-pink-500 to-violet-600 text-white' : 'text-[#d3d8e8] hover:text-white'}`}
        >
          <div className="flex items-center justify-center gap-2">
            <TbMailForward size={18} />
            Email
          </div>
        </button>
        <button
          onClick={() => setActiveTab('whatsapp')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${activeTab === 'whatsapp' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white' : 'text-[#d3d8e8] hover:text-white'}`}
        >
          <div className="flex items-center justify-center gap-2">
            <TbBrandWhatsapp size={18} />
            WhatsApp
          </div>
        </button>
      </div>

      <div className="rounded-lg border border-[#464c6a] p-6 bg-gradient-to-b from-[#10172d] to-[#0a0d22] shadow-lg">
        <p className="text-sm text-[#d3d8e8] mb-6 text-center">
          {"Si tienes alguna pregunta o inquietud, no dudes en contactarnos. Estamos abiertos a cualquier oportunidad laboral que se ajuste a nuestras habilidades e intereses."}
        </p>

        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-base text-[#d3d8e8]">Tu nombre: </label>
            <input
              className="bg-[#10172d] w-full border rounded-lg border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-4 py-3 text-[#d3d8e8] placeholder-[#464c6a]"
              type="text"
              maxLength="100"
              required={true}
              placeholder="Ingresa tu nombre completo"
              onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
              onBlur={checkRequired}
              value={userInput.name}
            />
          </div>

          {activeTab === 'email' && (
            <div className="flex flex-col gap-2">
              <label className="text-base text-[#d3d8e8]">Tu correo: </label>
              <input
                className="bg-[#10172d] w-full border rounded-lg border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-4 py-3 text-[#d3d8e8] placeholder-[#464c6a]"
                type="email"
                maxLength="100"
                required={true}
                placeholder="tucorreo@ejemplo.com"
                value={userInput.email}
                onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
                onBlur={() => {
                  checkRequired();
                  setError(prev => ({ ...prev, email: !isValidEmail(userInput.email) }));
                }}
              />
              {error.email && <p className="text-sm text-red-400">Por favor ingresa un correo electrónico válido</p>}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-base text-[#d3d8e8]">Tu mensaje: </label>
            <textarea
              className="bg-[#10172d] w-full border rounded-lg border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-4 py-3 text-[#d3d8e8] placeholder-[#464c6a]"
              maxLength="500"
              name="message"
              required={true}
              placeholder="Escribe tu mensaje aquí..."
              onChange={(e) => setUserInput({ ...userInput, message: e.target.value })}
              onBlur={checkRequired}
              rows="5"
              value={userInput.message}
            />
          </div>

          <div className="flex flex-col items-center gap-3 mt-4">
            {error.required && (
              <p className="text-sm text-red-400">
                Todos los campos marcados son obligatorios!
              </p>
            )}

            {activeTab === 'email' ? (
              <button
                className="group relative flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-8 py-3 text-center text-sm font-medium uppercase tracking-wider text-white transition-all duration-300 hover:from-violet-600 hover:to-pink-500 hover:shadow-lg hover:shadow-violet-500/30"
                onClick={handleSendMail}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span>Enviando...</span>
                ) : (
                  <>
                    <span className="transition-all duration-300 group-hover:translate-x-1">
                      Enviar mensaje
                    </span>
                    <TbMailForward size={20} className="transition-all duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            ) : (
              <button
                className="group relative flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-3 text-center text-sm font-medium uppercase tracking-wider text-white transition-all duration-300 hover:from-emerald-600 hover:to-emerald-500 hover:shadow-lg hover:shadow-emerald-500/30"
                onClick={handleWhatsApp}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span>Preparando...</span>
                ) : (
                  <>
                    <span className="transition-all duration-300 group-hover:translate-x-1">
                      Enviar por WhatsApp
                    </span>
                    <TbBrandWhatsapp size={20} className="transition-all duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;