import { useState, useRef, useEffect } from 'react';
import { Upload, ChevronDown, Check } from 'lucide-react';
import { UploadModal } from './UploadModal';

const roomTypes = [
  'Living Room',
  'Bedroom',
  'Kitchen',
  'Dining Room',
  'Home Office',
  'Outdoor',
];

const styles = [
  'Original',
  'Modern',
  'Midcentury',
  'Scandinavian',
  'Luxury',
  'Coastal',
  'Farmhouse',
];

// Generate staging examples for each room type and style combination
const generateStagingExamples = () => {
  const imageMap: { [key: string]: string } = {
    'Living Room-Original': 'https://images.unsplash.com/photo-1618062890251-66b15eb20fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXB0eSUyMHJvb20lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjUwMzc2NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'Living Room-Modern': 'https://images.unsplash.com/photo-1687180498602-5a1046defaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFnZWQlMjBsdXh1cnklMjBsaXZpbmclMjByb29tJTIwZnVybml0dXJlfGVufDF8fHx8MTc2NTA4NzkzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    'Living Room-Midcentury': 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FuZGluYXZpYW4lMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2NTA4NzkzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    'Living Room-Scandinavian': 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FuZGluYXZpYW4lMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2NTA4NzkzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    'Living Room-Luxury': 'https://images.unsplash.com/photo-1687180498602-5a1046defaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFnZWQlMjBsdXh1cnklMjBsaXZpbmclMjByb29tJTIwZnVybml0dXJlfGVufDF8fHx8MTc2NTA4NzkzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    'Living Room-Coastal': 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FuZGluYXZpYW4lMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2NTA4NzkzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    'Living Room-Farmhouse': 'https://images.unsplash.com/photo-1687180498602-5a1046defaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFnZWQlMjBsdXh1cnklMjBsaXZpbmclMjByb29tJTIwZnVybml0dXJlfGVufDF8fHx8MTc2NTA4NzkzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    'Bedroom-Original': 'https://images.unsplash.com/photo-1618062890251-66b15eb20fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXB0eSUyMHJvb20lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjUwMzc2NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'Bedroom-Modern': 'https://images.unsplash.com/photo-1750420556288-d0e32a6f517b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWRyb29tJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzY1MDIxNDM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'Bedroom-Midcentury': 'https://images.unsplash.com/photo-1583221742001-9ad88bf233ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmdXJuaXNoZWQlMjBiZWRyb29tfGVufDF8fHx8MTc2NTA4NjY5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    'Bedroom-Scandinavian': 'https://images.unsplash.com/photo-1750420556288-d0e32a6f517b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWRyb29tJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzY1MDIxNDM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'Bedroom-Luxury': 'https://images.unsplash.com/photo-1583221742001-9ad88bf233ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmdXJuaXNoZWQlMjBiZWRyb29tfGVufDF8fHx8MTc2NTA4NjY5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    'Bedroom-Coastal': 'https://images.unsplash.com/photo-1750420556288-d0e32a6f517b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiZWRyb29tJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzY1MDIxNDM5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    'Bedroom-Farmhouse': 'https://images.unsplash.com/photo-1583221742001-9ad88bf233ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmdXJuaXNoZWQlMjBiZWRyb29tfGVufDF8fHx8MTc2NTA4NjY5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    'Kitchen-Original': 'https://images.unsplash.com/photo-1618062890251-66b15eb20fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXB0eSUyMHJvb20lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjUwMzc2NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'Kitchen-Modern': 'https://images.unsplash.com/photo-1687180498602-5a1046defaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFnZWQlMjBsdXh1cnklMjBsaXZpbmclMjByb29tJTIwZnVybml0dXJlfGVufDF8fHx8MTc2NTA4NzkzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    'Kitchen-Midcentury': 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FuZGluYXZpYW4lMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2NTA4NzkzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    'Kitchen-Scandinavian': 'https://images.unsplash.com/photo-1687180498602-5a1046defaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFnZWQlMjBsdXh1cnklMjBsaXZpbmclMjByb29tJTIwZnVybml0dXJlfGVufDF8fHx8MTc2NTA4NzkzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    'Kitchen-Luxury': 'https://images.unsplash.com/photo-1687180498602-5a1046defaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFnZWQlMjBsdXh1cnklMjBsaXZpbmclMjByb29tJTIwZnVybml0dXJlfGVufDF8fHx8MTc2NTA4NzkzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    'Kitchen-Coastal': 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FuZGluYXZpYW4lMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2NTA4NzkzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    'Kitchen-Farmhouse': 'https://images.unsplash.com/photo-1687180498602-5a1046defaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFnZWQlMjBsdXh1cnklMjBsaXZpbmclMjByb29tJTIwZnVybml0dXJlfGVufDF8fHx8MTc2NTA4NzkzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    'Dining Room-Original': 'https://images.unsplash.com/photo-1618062890251-66b15eb20fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXB0eSUyMHJvb20lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjUwMzc2NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'Dining Room-Modern': 'https://images.unsplash.com/photo-1613545325268-314979eeef03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkaW5pbmclMjByb29tfGVufDF8fHx8MTc2NTAzNjAyMnww&ixlib=rb-4.1.0&q=80&w=1080',
    'Dining Room-Midcentury': 'https://images.unsplash.com/photo-1613545325268-314979eeef03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkaW5pbmclMjByb29tfGVufDF8fHx8MTc2NTAzNjAyMnww&ixlib=rb-4.1.0&q=80&w=1080',
    'Dining Room-Scandinavian': 'https://images.unsplash.com/photo-1613545325268-314979eeef03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkaW5pbmclMjByb29tfGVufDF8fHx8MTc2NTAzNjAyMnww&ixlib=rb-4.1.0&q=80&w=1080',
    'Dining Room-Luxury': 'https://images.unsplash.com/photo-1613545325268-314979eeef03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkaW5pbmclMjByb29tfGVufDF8fHx8MTc2NTAzNjAyMnww&ixlib=rb-4.1.0&q=80&w=1080',
    'Dining Room-Coastal': 'https://images.unsplash.com/photo-1613545325268-314979eeef03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkaW5pbmclMjByb29tfGVufDF8fHx8MTc2NTAzNjAyMnww&ixlib=rb-4.1.0&q=80&w=1080',
    'Dining Room-Farmhouse': 'https://images.unsplash.com/photo-1613545325268-314979eeef03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBkaW5pbmclMjByb29tfGVufDF8fHx8MTc2NTAzNjAyMnww&ixlib=rb-4.1.0&q=80&w=1080',
    'Home Office-Original': 'https://images.unsplash.com/photo-1618062890251-66b15eb20fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXB0eSUyMHJvb20lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjUwMzc2NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'Home Office-Modern': 'https://images.unsplash.com/photo-1687180498602-5a1046defaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFnZWQlMjBsdXh1cnklMjBsaXZpbmclMjByb29tJTIwZnVybml0dXJlfGVufDF8fHx8MTc2NTA4NzkzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    'Home Office-Midcentury': 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FuZGluYXZpYW4lMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2NTA4NzkzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    'Home Office-Scandinavian': 'https://images.unsplash.com/photo-1687180498602-5a1046defaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFnZWQlMjBsdXh1cnklMjBsaXZpbmclMjByb29tJTIwZnVybml0dXJlfGVufDF8fHx8MTc2NTA4NzkzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    'Home Office-Luxury': 'https://images.unsplash.com/photo-1687180498602-5a1046defaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFnZWQlMjBsdXh1cnklMjBsaXZpbmclMjByb29tJTIwZnVybml0dXJlfGVufDF8fHx8MTc2NTA4NzkzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    'Home Office-Coastal': 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FuZGluYXZpYW4lMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2NTA4NzkzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    'Home Office-Farmhouse': 'https://images.unsplash.com/photo-1687180498602-5a1046defaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFnZWQlMjBsdXh1cnklMjBsaXZpbmclMjByb29tJTIwZnVybml0dXJlfGVufDF8fHx8MTc2NTA4NzkzOHww&ixlib=rb-4.1.0&q=80&w=1080',
    'Outdoor-Original': 'https://images.unsplash.com/photo-1618062890251-66b15eb20fe3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbXB0eSUyMHJvb20lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjUwMzc2NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'Outdoor-Modern': 'https://images.unsplash.com/photo-1751945965597-71171ec7a458?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwc3RhZ2luZyUyMGludGVyaW9yfGVufDF8fHx8MTc2NTA4NjY5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    'Outdoor-Midcentury': 'https://images.unsplash.com/photo-1751945965597-71171ec7a458?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwc3RhZ2luZyUyMGludGVyaW9yfGVufDF8fHx8MTc2NTA4NjY5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    'Outdoor-Scandinavian': 'https://images.unsplash.com/photo-1751945965597-71171ec7a458?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwc3RhZ2luZyUyMGludGVyaW9yfGVufDF8fHx8MTc2NTA4NjY5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    'Outdoor-Luxury': 'https://images.unsplash.com/photo-1751945965597-71171ec7a458?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwc3RhZ2luZyUyMGludGVyaW9yfGVufDF8fHx8MTc2NTA4NjY5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    'Outdoor-Coastal': 'https://images.unsplash.com/photo-1751945965597-71171ec7a458?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwc3RhZ2luZyUyMGludGVyaW9yfGVufDF8fHx8MTc2NTA4NjY5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    'Outdoor-Farmhouse': 'https://images.unsplash.com/photo-1751945965597-71171ec7a458?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aXJ0dWFsJTIwc3RhZ2luZyUyMGludGVyaW9yfGVufDF8fHx8MTc2NTA4NjY5N3ww&ixlib=rb-4.1.0&q=80&w=1080',
  };

  const examples = [];
  for (const room of roomTypes) {
    for (const style of styles) {
      const key = `${room}-${style}`;
      examples.push({
        room,
        style,
        image: imageMap[key] || imageMap['Living Room-Modern'],
      });
    }
  }
  return examples;
};

export function Hero() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [currentStyleIndex, setCurrentStyleIndex] = useState(0);
  const [roomDropdownOpen, setRoomDropdownOpen] = useState(false);
  const [styleDropdownOpen, setStyleDropdownOpen] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  
  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const slideIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const roomDropdownRef = useRef<HTMLDivElement>(null);
  const styleDropdownRef = useRef<HTMLDivElement>(null);

  const stagingExamples = generateStagingExamples();
  const currentRoom = roomTypes[currentRoomIndex];
  const currentStyle = styles[currentStyleIndex];
  const currentExample = stagingExamples.find(
    ex => ex.room === currentRoom && ex.style === currentStyle
  ) || stagingExamples[0];

  const ROTATION_INTERVAL = 3000;

  // Handle auto-rotation
  useEffect(() => {
    const startAutoRotation = () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }

      slideIntervalRef.current = setInterval(() => {
        if (!isUserInteracting) {
          setCurrentStyleIndex((prevStyle) => {
            // If we've reached the last style, move to the next room and reset style to 0
            if (prevStyle === styles.length - 1) {
              setCurrentRoomIndex((prevRoom) => (prevRoom + 1) % roomTypes.length);
              return 0;
            }
            return prevStyle + 1;
          });
        }
      }, ROTATION_INTERVAL);
    };

    startAutoRotation();

    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
    };
  }, [isUserInteracting]);

  // Handle user interaction
  const handleUserInteraction = () => {
    setIsUserInteracting(true);

    // Clear existing timeout
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }

    // Resume auto-rotation after 3 seconds of inactivity
    interactionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 3000);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (roomDropdownRef.current && !roomDropdownRef.current.contains(event.target as Node)) {
        setRoomDropdownOpen(false);
      }
      if (styleDropdownRef.current && !styleDropdownRef.current.contains(event.target as Node)) {
        setStyleDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoomChange = (room: string) => {
    const roomIndex = roomTypes.indexOf(room);
    if (roomIndex !== -1) {
      setCurrentRoomIndex(roomIndex);
      // Reset style to 0 when changing room manually so it starts fresh
      setCurrentStyleIndex(0);
      handleUserInteraction();
    }
    setRoomDropdownOpen(false);
  };

  const handleStyleChange = (style: string) => {
    const styleIndex = styles.indexOf(style);
    if (styleIndex !== -1) {
      setCurrentStyleIndex(styleIndex);
      handleUserInteraction();
    }
    setStyleDropdownOpen(false);
  };

  const handleImageUpload = (file: File) => {
    console.log('Image uploaded:', file);
    // Here you would typically send the image to your backend/AI service
  };

  // Calculate room progress (how far through styles we are)
  const roomProgress = ((currentStyleIndex + 1) / styles.length) * 100;

  return (
    <>
      <style>
        {`
          @keyframes progress {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}
      </style>
      <section className="pt-20 pb-12 md:pt-24 md:pb-16 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8">
              <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-500/30 px-4 py-2 rounded-full">
                <span className="text-sm text-emerald-400">Developed at Harvard Innovation Lab</span>
              </div>
              
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl">
                Virtual Staging with one click
              </h1>
              
              <p className="text-blue-100 text-lg md:text-xl">
                Upload a picture and our AI will <span className="text-white">add furniture within seconds.</span>
              </p>

              <button
                onClick={() => setUploadModalOpen(true)}
                className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center space-x-2 group shadow-xl"
              >
                <span>Upload image for free</span>
                <Upload className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />
              </button>

              <p className="text-blue-200 text-sm">
                No sign up | No credit card
              </p>
            </div>

            {/* Right Preview with Interactive Overlays */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-900">
                  <img
                    key={`${currentRoom}-${currentStyle}`}
                    src={currentExample.image}
                    alt={`${currentRoom} - ${currentStyle}`}
                    className="w-full h-full object-cover transition-opacity duration-500"
                  />
                  
                  {/* Bottom Left: Room Type Selector Overlay */}
                  <div className="absolute bottom-4 left-4 z-20">
                    <div ref={roomDropdownRef} className="relative">
                      <button
                        onClick={() => {
                          setRoomDropdownOpen(!roomDropdownOpen);
                          handleUserInteraction();
                        }}
                        className="relative overflow-hidden bg-white/95 backdrop-blur-sm text-gray-800 h-14 min-w-[160px] pl-4 pr-10 rounded-xl hover:bg-white transition-all flex items-center shadow-xl border border-transparent hover:border-blue-400"
                      >
                         {/* Progress Bar Background for Room (Cycles through styles) */}
                         <div 
                          className="absolute left-0 top-0 bottom-0 bg-gray-200/50 transition-all duration-500 ease-out"
                          style={{ width: `${roomProgress}%` }}
                        />
                        
                        <div className="relative z-10 flex items-center justify-between w-full">
                          <span className="text-sm font-medium">{currentRoom}</span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-500 absolute right-3 z-10 transition-transform duration-300 ${
                            roomDropdownOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {roomDropdownOpen && (
                        <div className="absolute bottom-full mb-2 w-56 bg-white rounded-xl shadow-2xl overflow-hidden z-30 border border-gray-200">
                          <div className="max-h-64 overflow-y-auto">
                            {roomTypes.map((room) => (
                              <button
                                key={room}
                                onClick={() => handleRoomChange(room)}
                                className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-all flex items-center justify-between ${
                                  room === currentRoom
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'text-gray-700'
                                }`}
                              >
                                <span className="text-sm">{room}</span>
                                {room === currentRoom && <Check className="w-3 h-3" />}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Right: Style Selector Overlay */}
                  <div className="absolute bottom-4 right-4 z-20">
                    <div ref={styleDropdownRef} className="relative">
                      <button
                        onClick={() => {
                          setStyleDropdownOpen(!styleDropdownOpen);
                          handleUserInteraction();
                        }}
                        className="relative overflow-hidden bg-white/95 backdrop-blur-sm text-gray-800 h-14 min-w-[180px] pl-4 pr-10 rounded-xl hover:bg-white transition-all flex items-center shadow-xl border border-transparent hover:border-blue-400"
                      >
                        {/* Animated Progress Bar Background for Style Timer */}
                        <div 
                          key={currentStyle} // Reset animation on style change
                          className="absolute left-0 top-0 bottom-0 bg-gray-200/50"
                          style={{ 
                            width: '0%',
                            animation: 'progress 3000ms linear forwards',
                            animationPlayState: isUserInteracting ? 'paused' : 'running'
                          }}
                        />

                        <div className="relative z-10 flex items-center justify-between w-full">
                          <span className="text-sm font-medium">{currentStyle}</span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-500 absolute right-3 z-10 transition-transform duration-300 ${
                            styleDropdownOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {styleDropdownOpen && (
                        <div className="absolute bottom-full mb-2 w-56 bg-white rounded-xl shadow-2xl overflow-hidden z-30 border border-gray-200 right-0">
                          <div className="max-h-64 overflow-y-auto">
                            {styles.map((style) => (
                              <button
                                key={style}
                                onClick={() => handleStyleChange(style)}
                                className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-all flex items-center justify-between ${
                                  style === currentStyle
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'text-gray-700'
                                }`}
                              >
                                <span className="text-sm">{style}</span>
                                {style === currentStyle && <Check className="w-3 h-3" />}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Text Below Image */}
              <div className="mt-6 flex justify-center">
                 {!isUserInteracting ? (
                  <span className="text-xs text-blue-200 flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Auto-cycling styles</span>
                  </span>
                ) : (
                  <span className="text-xs text-blue-200 flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                    <span>Paused (Interacting)</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onImageUpload={handleImageUpload}
      />
    </>
  );
}
